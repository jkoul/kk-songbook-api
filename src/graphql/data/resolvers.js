const { getCollection, getSort, getQuery, getSingleCollection } = require('../../mongo')

// Provide resolver functions for your schema fields
module.exports = {
  Query: {
    songs: async (root, { sort, ...args }) => {
      const query = getQuery({ ...args })
      const sortBlock = getSort(sort)

      return await getCollection('songs', query, sortBlock)
    },
    song: async (root, { id, ...args }) => {
      const query = getQuery({ id, ...args })
      
      return await getSingleCollection('songs', query)
    }
  },
}
