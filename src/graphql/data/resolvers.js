const { getCollection, getSort, getQuery } = require('../../mongo')

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    songs: async (root, { sort, ...args }) => {
      const query = getQuery({ ...args })
      const sortBlock = getSort(sort)

      return await getCollection('songs', query, false, sortBlock)
    },
    song: async (root, { id, ...args }) => {
      const query = getQuery({ id, ...args })
      
      return await getCollection('songs', query, true)
    }
  },
}

module.exports = resolvers
