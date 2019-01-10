const { ObjectId } = require('mongodb')
const { getCollection } = require('../../mongo')

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    songs: async (root, { title, sort }) => {
      const query = title ? { title: { $regex: new RegExp(title, 'g') } } : {}
      let sortBlock = {}
      sort.forEach((s) => {
        sortBlock[s.field] = s.order
      })
      return await getCollection('songs', query, false, sortBlock)
    },
    song: async (root, { id, title }) => {
      const query = id ? { _id: ObjectId(id) } : { title: { $regex: new RegExp(title, 'g') } }
      return await getCollection('songs', query, true)
    }
  },
}

module.exports = resolvers
