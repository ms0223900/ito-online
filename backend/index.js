const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers')
const { MONGO_DB_CODE } = require('./config.js')

const pubsub = new PubSub()

const PORT = process.env.PORT || 5001

const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  context: ({ req, }) => ({ req, pubsub, })
})

mongoose
  .connect(MONGO_DB_CODE, { useNewUrlParser: true, })
  .then(() => {
    console.log('MongoDB is connected!')
    return server.listen({ port: PORT, })
  })
  .then(res => {
    console.log(`Server si running at ${res.url}`)
  })
  .catch(err => {
    console.log(err)
  })