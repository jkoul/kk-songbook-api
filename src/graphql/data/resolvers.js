const { ObjectId } = require('mongodb')
const { getCollection } = require('../../mongo')

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    songs: async () => await getCollection('songs'),
    song: async (root, { id }) => {
      return await getCollection('songs', { _id: ObjectId(id) })
    }
  },
}

module.exports = resolvers
