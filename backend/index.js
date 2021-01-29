const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
// const typeDefs = require('./graphql/typeDefs.js')
// const resolvers = require('./graphql/resolvers')
const { MONGO_DB_CODE } = require('./config.js');
const User = require('./src/model/User.js');
const { getUsers } = require('./src/resolvers/user.js');
const { emitMessage } = require('./src/socket/socket.js');

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

app.get('/', (req, res) => {
  res.send(`<h1>HI It's Server Side.</h1>`);
});
app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

const SOCKET_EVENT_KEYS = {
  ADD_COUNT: 'add-count',
};


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

(function() {
  let roomCountList = [];

  // 每個client端的connection是獨立的scope
  io.on('connection', socket => {
    console.log('user connected');

    socket.on('chat-message', value => {
      console.log(value);
    });

    socket.on('join-room', e => {
      console.log(e);
      if(e && e.roomId) {
        socket.join(e.roomId);
        emitMessage(socket, e.roomId)();
        const roomCounts = roomCountList.find(c => c.roomId === e.roomId);
        socket.emit(SOCKET_EVENT_KEYS.ADD_COUNT, roomCounts || undefined);
      }
    });

    socket.on(SOCKET_EVENT_KEYS.ADD_COUNT, e => {
      if(e) {
        console.log(e);
        const {
          roomId, count,
        } = e;
        if(roomId) {
          const newRoomCountList = reducers.addCount({ roomCountList, }, { roomId, count, });
          roomCountList = newRoomCountList.latestDataList;
          socket.to(roomId).emit(SOCKET_EVENT_KEYS.ADD_COUNT, newRoomCountList.updateData);
          console.log(roomCountList);
        }
      }
    });

    socket.emit('chat-message', {
      message: 'message from server'
    });

    emitMessage(io, 'room1')();
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