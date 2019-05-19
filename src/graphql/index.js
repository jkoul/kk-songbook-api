const { GraphQLServer } = require('graphql-yoga')
const schema = require('./data/schema')
const resolvers = require('./data/resolvers')
// const mocks = {
//   Query: () => ({
//     hello: () => 'Hello World',
//     listOfStrings: () => new MockList([2, 6]),
//   }),
// }

module.exports = new GraphQLServer({
  typeDefs: schema,
  resolvers
})
