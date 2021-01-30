const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const cors = require('cors');
// const typeDefs = require('./graphql/typeDefs.js')
// const resolvers = require('./graphql/resolvers')
const { MONGO_DB_CODE, SOCKET_EVENT } = require('./config.js');
const User = require('./src/model/User.js');
const { getUsers } = require('./src/resolvers/user.js');
const { getRooms } = require('./src/resolvers/room.js');
const { emitMessage, GamesManager } = require('./src/socket/socket.js');

const PORT = process.env.PORT || 5001;

const pubsub = new PubSub();


// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req, }) => ({ req, pubsub, })
// })

const CLIENT_SIDE_ORIGIN = 
  process.env.NODE_ENV === 'production' ? 
    process.env.CLIENT_URL :
    'http://localhost:3000';

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: CLIENT_SIDE_ORIGIN,
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.get('/', (req, res) => {
  res.send(`<h1>HI It's Server Side.</h1>`);
});
app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get('/rooms', async (req, res) => {
  const rooms = await getRooms();
  res.send(rooms);
});
app.post('/room', (req, res) => {
  console.log(req.body);
});


const reducers = {
  addCount(state, payload) {
    const {
      roomCountList=[],
    } = state;
    const {
      roomId, count
    } = payload;
    let newRoomCountList = [...roomCountList];

    const roomCountsIndex = roomCountList.findIndex(c => c.roomId === roomId);

    if(roomCountsIndex !== -1) {
      newRoomCountList[roomCountsIndex] = {
        ...newRoomCountList[roomCountsIndex],
        count: newRoomCountList[roomCountsIndex].count + count,
      };
    } else {
      newRoomCountList.push({
        roomId,
        count: 1,
      });
    }

    return ({
      updateData: newRoomCountList[roomCountsIndex],
      latestDataList: newRoomCountList,
    });
  },
};

class Player {
  constructor() {
    this.userId = '';
    this.roomId = '';
  }

  setPlayerState(roomId, userId) {
    this.roomId = roomId;
    this.userId = userId;
  }
}

(function() {
  // let roomCountList = [];
  const gamesManager = new GamesManager();

  // 每個client端的connection是獨立的scope
  io.on('connection', socket => {
    console.log('user connected');
    const player = new Player();

    // init
    socket.on(SOCKET_EVENT.JOIN_ROOM, e => {
      console.log(e);
      if(e && e.roomId && e.user) {
        const {
          roomId, user,
        } = e;
        // enter new room
        if(roomId !== player.roomId) {
          gamesManager.handlePlayerExit(player.roomId, player.user);
        }
        player.setPlayerState(roomId, user.id);
        gamesManager.enterGame(socket, { roomId, user, }).initGame(socket, io);
        console.log(gamesManager);
      }
    });

    // leave room, offline
    socket.on('disconnect', e => {
      console.log(player, 'user disconnected.');
      if(player.userId && player.roomId) {
        gamesManager.handlePlayerExit(player.roomId, player.userId);
      }
    });

    socket.emit('chat-message', {
      message: 'message from server'
    });
  });
} ());

mongoose
  .connect(MONGO_DB_CODE, { useNewUrlParser: true, })
  .then(() => {
    console.log('MongoDB is connected!');
    // return server.listen({ port: PORT, })
    server.listen(PORT, () => {
      console.log(`Listen on localhost:${PORT}`);
    });
  })
  .then(res => {
    res && console.log(`Server is running at ${res.url}`);
  })
  .catch(err => {
    console.log(err);
  });

module.exports = {
  io,
};