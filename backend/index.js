const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
// const typeDefs = require('./graphql/typeDefs.js')
// const resolvers = require('./graphql/resolvers')
const { MONGO_DB_CODE } = require('./config.js')


const pubsub = new PubSub()

const PORT = process.env.PORT || 5001

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req, }) => ({ req, pubsub, })
// })

const CLIENT_SIDE_ORIGIN = 'http://localhost:3000'

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: CLIENT_SIDE_ORIGIN,
    methods: ['GET', 'POST']
  }
})

app.get('/', (req, res) => {
  res.send(`<h1>HI It's Server Side.</h1>`)
})

io.on('connection', socket => {
  console.log('user connected')

  socket.on('chat-message', value => {
    console.log(value)
  })
})

server.listen(PORT, () => {
  console.log(`Listen on localhost:${PORT}`)
})

// mongoose
//   .connect(MONGO_DB_CODE, { useNewUrlParser: true, })
//   .then(() => {
//     console.log('MongoDB is connected!')
//     return server.listen({ port: PORT, })
//   })
//   .then(res => {
//     console.log(`Server is running at ${res.url}`)
//   })
//   .catch(err => {
//     console.log(err)
//   })