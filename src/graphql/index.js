const { ApolloServer, gql } = require('apollo-server-express')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    helloWorld: () => 'Hello world!',
  },
}

module.exports = new ApolloServer({ typeDefs, resolvers })
