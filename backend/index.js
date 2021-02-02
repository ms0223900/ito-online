const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const cors = require('cors');
// const typeDefs = require('./graphql/typeDefs.js')
// const resolvers = require('./graphql/resolvers')
const { MONGO_DB_CODE, SOCKET_EVENT } = require('./config.js');
const User = require('./src/model/User.js');
const { getUsers } = require('./src/resolvers/user.js');
const { emitMessage, GamesManager } = require('./src/socket/socket.js');
const {
  useRoomRoutes,
} = require('./src/routes/room');

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

const express = require('express');
const { deleteRoom, updateRoom } = require('./src/resolvers/room.js');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: CLIENT_SIDE_ORIGIN,
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, }));

app.get('/', (req, res) => {
  res.send(`<h1>HI It's Server Side.</h1>`);
});
app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.send(users);
});
useRoomRoutes(app);


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

  // 每個client端的connection是獨立的scope(socket都是獨立的)
  io.on('connection', socket => {
    console.log('user connected');
    const player = new Player();

    // 直接傳送所有房間?
    socket.emit(SOCKET_EVENT.GAME_STATUS, );

    // init
    socket.on(SOCKET_EVENT.JOIN_ROOM, e => {
      if(e && e.roomId && e.user) {
        const {
          roomId, user,
        } = e;
        // enter new room
        if(roomId !== player.roomId) {
          gamesManager.handlePlayerExit(player.roomId, player.user)();
        }
        player.setPlayerState(roomId, user.id);
        gamesManager
          .enterGame(io, socket, { roomId, user, })((payload) => {
            updateRoom({}, payload);
          })
          .then(res => {
            res.initGame(socket, io);
          });
        // console.log(gamesManager);
      }
    });
    socket.on(SOCKET_EVENT.LEAVE_ROOM, e => {
      if(e && e.userId && e.roomId) {
        console.log(player, ' leave room.');
        gamesManager.handlePlayerExit(e.roomId, e.userId)(
          // (payload) => {
          //   deleteRoom({}, payload);
          // },
          undefined, 
          (payload) => {
            updateRoom({}, payload);
          }
        );
      }
    });

    // leave room, offline
    socket.on('disconnect', e => {
      console.log(player, 'user disconnected.');
      if(player.userId && player.roomId) {
        gamesManager.handlePlayerExit(player.roomId, player.userId)(
          // (payload) => {
          //   deleteRoom({}, payload);
          // },
          undefined, 
          (payload) => {
            updateRoom({}, payload);
          }
        );
      }
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
  app,
};