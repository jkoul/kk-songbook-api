const { ObjectId } = require('mongodb')
const { getCollection } = require('../../mongo')

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    songs: async (root, { sort }) => await getCollection('songs', {}, false, { [sort.field]: sort.order }),
    song: async (root, { id }) => await getCollection('songs', { _id: ObjectId(id) }, true)
  },
}

module.exports = resolvers
