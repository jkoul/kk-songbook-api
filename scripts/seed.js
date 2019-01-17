require('dotenv-safe').config({ allowEmptyValues: true })

const mi = require('mongoimport')
const winston = require('../src/logger')
const songsSample = require('./songs-sample.json')

const { DB_USER, DB_PASS, DB_URL, DB_PORT, DB_NAME } = process.env

try {
  mi({
    fields: songsSample,
    db: DB_NAME,
    collection: 'songs',
    host: `${DB_URL}:${DB_PORT}`,
    username: DB_USER,
    password: DB_PASS,
  })
  winston.info('Successfully import song file')
} catch (e) {
  winston.error('Failed to import song file')
}
