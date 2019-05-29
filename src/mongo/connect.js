const { MongoClient } = require('mongodb')
const logger = require('../logger')

const { DB_USER, DB_PASS, DB_URL, DB_NAME, NODE_ENV } = process.env
const connectionString = NODE_ENV !== 'development' ? `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}` : `mongodb://${DB_URL}`

module.exports = async (queryFunc) => {
  let client
  try {
    client = await MongoClient.connect(connectionString, { useNewUrlParser: true })
    const db = client.db(DB_NAME)
    const result = await queryFunc(db)

    client.close()
    return result
  } catch (e) {
    logger.error('error', e)
  }
}
