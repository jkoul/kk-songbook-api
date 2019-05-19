const { MongoClient, ObjectId } = require('mongodb')
const logger = require('../logger')

const { DB_USER, DB_PASS, DB_URL, DB_NAME, NODE_ENV } = process.env
// Connection url
const connectionString = NODE_ENV !== 'development' ? `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}` : `mongodb://${DB_URL}`

const getCollection = async (colName, query, isOne=false, sort) => {
  let client
  try {
    client = await MongoClient.connect(connectionString, { useNewUrlParser: true })
    const db = client.db(DB_NAME)

    if (isOne) {
      return await db.collection(colName).findOne(query)
    }
    const collection = db.collection(colName).find(query || {})
    return sort ? await collection.sort(sort).toArray() : await collection.toArray()
  } catch (e) {
    logger.error('error', e)
  } finally {
    client.close()
  }
}

const getQuery = (args) => {
  const { id, ...rest } = args
  if (id) {
    return { _id: ObjectId(id) }
  }
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
  getQuery,
  getSort,
}
