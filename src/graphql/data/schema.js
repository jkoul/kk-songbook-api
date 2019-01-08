const { gql } = require('apollo-server-express')

// Construct a schema, using GraphQL schema language
const schema = gql`
  input SortInput {
    field: String,
    order: Int,
  }

  type Query {
    songs(sort: SortInput): [Song]!
    song(id: ID): Song
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
