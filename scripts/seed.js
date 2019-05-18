
const mi = require('mongoimport')
const { MongoClient } = require('mongodb')
const { info, error } =  require('../src/logger')
const initialSongs = require('./kksongbookNov2018.json')

// const { DB_USER, DB_PASS, DB_URL, DB_PORT, DB_NAME, NODE_ENV } = process.env
// Connection url
const dbUrl = 'mongodb://localhost:27017/kostumeKaraoke'
// const connectionString = NODE_ENV !== 'development' ? `mongodb://${DB_USER}:${DB_PASS}@${dbUrl}` : `mongodb://${dbUrl}`

// make client connect to mongo service
MongoClient.connect(dbUrl, (err, db) => {
  if (err) {
    error(err)
    throw err
  }
  info('Database created!')

  mi({
    fields: initialSongs,
    db: 'kostumeKaraoke',
    collection: 'songs',
    host: 'localhost:27017',
    callback: (err) => {
      if (err) {
        error('Failed to import song file')
        error(err)
        db.close()
        throw err
      }
      info('Successfully imported song file')
      db.close()
    }
  })
})
