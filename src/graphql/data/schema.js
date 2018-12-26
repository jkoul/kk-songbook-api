const { gql } = require('apollo-server-express')

// Construct a schema, using GraphQL schema language
const schema = gql`
  type Query {
    helloWorld: String
  }
`

module.exports = schema
