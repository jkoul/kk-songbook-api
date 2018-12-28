const { getCollection } = require('../../mongo')

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    songs: async () => await getCollection('songs'),
  },
}

module.exports = resolvers
