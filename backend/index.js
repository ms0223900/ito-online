const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
// const typeDefs = require('./graphql/typeDefs.js')
// const resolvers = require('./graphql/resolvers')
const { MONGO_DB_CODE } = require('./config.js');
const User = require('./src/model/User.js');
const { getUsers } = require('./src/resolvers/user.js');


const pubsub = new PubSub();

const PORT = process.env.PORT || 5001;

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

io.on('connection', socket => {
  console.log('user connected');

  socket.on('chat-message', value => {
    console.log(value);
  });
});

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
    console.log(`Server is running at ${res.url}`);
  })
  .catch(err => {
    console.log(err);
  });