const { MongoClient, ObjectId } = require('mongodb')

const { DB_USER, DB_PASS, DB_URL, DB_PORT, DB_NAME, NODE_ENV } = process.env
// Connection url
const dbUrl = `${DB_URL}:${DB_PORT}`
const connectionString = NODE_ENV !== 'development' ? `mongodb://${DB_USER}:${DB_PASS}@${dbUrl}` : `mongodb://${dbUrl}`

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
    console.log('error', e)
  } finally {
    client.close()
  }
}

const getQuery = (args) => {
  const { id, ...rest } = args
  let query = {}
  if (id) {
    query = { _id: ObjectId(id) }
  }
  const key = Object.keys(rest)[0]
  return {
    ...query,
    [key]: { $regex: new RegExp(rest[key], 'g') }
  }
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
