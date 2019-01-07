const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const server = require('./graphql')
const logger = require('./logger')

const app = express()
server.applyMiddleware({ app })
// Enable CORS, security, favicon and body parsing
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Catch 404 and forward to error handler
app.use((req, res) => {
  logger.error(`status: [404] Not Found ${req.path}`)
  res.status(404).send('Quoth the server...404')
})

// Error handler
app.use((err, req, res) => {
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message,
    })
})

module.exports = app
