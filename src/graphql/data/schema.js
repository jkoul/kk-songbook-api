const { gql } = require('apollo-server-express')

// Construct a schema, using GraphQL schema language
const schema = gql`
  input SortInput {
    field: String,
    order: Int,
  }

  type Query {
    songs(title: String, artist: String, sort: [SortInput]): [Song]!
    song(id: ID, title: String, artist: String): Song
  }

  type Song {
    _id: ID!
    title: String
    artist: String
    length: String
    notes: String
  }
`

module.exports = schema
