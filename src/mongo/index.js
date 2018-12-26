const { MongoClient } = require('mongodb')

const { DB_USER, DB_PASS, DB_URL, DB_PORT, NODE_ENV } = process.env
// Connection url
const dbUrl = `${DB_URL}:${DB_PORT}`
const connectionString = NODE_ENV !== 'development' ? `mongodb://${DB_USER}:${DB_PASS}@${dbUrl}` : `mongodb://${dbUrl}`
const dbName = 'kostumeKaraoke'

const getCollection = async (colName, query) => {
  let client
  try {
    client = await MongoClient.connect(connectionString, { useNewUrlParser: true })
    const db = client.db(dbName)
    console.log('query', query)
    const test = await db.collection(colName).find(query || {}).toArray()
    console.log('test', test)
    return test
  } finally {
    client.close()
  }
}

module.exports = {
  getCollection
}
