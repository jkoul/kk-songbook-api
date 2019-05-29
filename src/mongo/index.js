const { ObjectId } = require('mongodb')
const getConnection = require('./connect')

// Connection url
const getCollection = async (colName, query, sort) => {
  const queryFunc = db => db.collection(colName).find(query || {}).sort(sort).toArray()
  return getConnection(queryFunc)
}

const getSingleCollection = async (colName, query) => {
  const queryFunc = db => db.collection(colName).findOne(query)
  return getConnection(queryFunc)
}

const getQuery = (args) => {
  const { id, ...rest } = args
  if (id) {
    return { _id: ObjectId(id) }
  }
  // THIS IS NOT CURRENTLY USED
  if (rest.length > 0) {
    const key = Object.keys(rest)[0]
    return {
      [key]: { $regex: new RegExp(rest[key], 'g') }
    }
  }
  return null
}

const getSort = (sort) => {
  let sortBlock = {}
  sort.forEach((s) => {
    sortBlock[s.field] = s.order
  })
  return sortBlock
}

module.exports = {
  getCollection,
  getSingleCollection,
  getQuery,
  getSort,
}
