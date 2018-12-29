const { MongoClient } = require('mongodb')

const { DB_USER, DB_PASS, DB_URL, DB_PORT, DB_NAME, NODE_ENV } = process.env
// Connection url
const dbUrl = `${DB_URL}:${DB_PORT}`
const connectionString = NODE_ENV !== 'development' ? `mongodb://${DB_USER}:${DB_PASS}@${dbUrl}` : `mongodb://${dbUrl}`

const getCollection = async (colName, query, isOne=false) => {
  let client
  try {
    client = await MongoClient.connect(connectionString, { useNewUrlParser: true })
    const db = client.db(DB_NAME)
    return await isOne ? db.collection(colName).findOne(query) : db.collection(colName).find(query || {}).toArray()
  } finally {
    client.close()
  }
}

module.exports = {
  getCollection,
}
