const { ApolloServer } = require('apollo-server-express')
const schema = require('./data/schema')
const resolvers = require('./data/resolvers')

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

module.exports = server
