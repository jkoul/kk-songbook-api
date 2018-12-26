const { ObjectId } = require('mongodb')
const { ApolloServer, gql } = require('apollo-server-express')
const { getCollection } = require('../mongo')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    songs: [Song]!
    song(id: ID): Song
  }

  type Song {
    _id: ID!
    title: String
    artist: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    songs: async () => await getCollection('songs'),
    song: async (_, { id }) => {
      return await getCollection('songs', { _id: ObjectId(id) })
    }
  },
}

module.exports = new ApolloServer({ typeDefs, resolvers })
