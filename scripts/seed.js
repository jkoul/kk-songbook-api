const mi = require('mongoimport')
const { MongoClient } = require('mongodb')
const { info, error } =  require('../src/logger')
const initialSongs = require('./kksongbookNov2018.json')

const { hostname = 'localhost', port = 27017 } = process.env

// Connection url
const host = `${hostname}:${port}`
const dbUrl = `mongodb://${host}/kostumeKaraoke`

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
    host,
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
