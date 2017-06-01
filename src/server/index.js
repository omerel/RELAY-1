// @flow

import compression from 'compression'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import routing from './routing'
import { WEB_PORT, STATIC_PATH, MONGODB_URI } from '../shared/config'
import { isProd } from '../shared/util'
import setUpSocket from './socket'

/* eslint-disable no-console */

// Connect to the database
// mongoose.Promise = global.Promise
mongoose.Promise = require('bluebird')
// assert.equal(query.exec().constructor, require('bluebird'))
// Promise.promisifyAll(require('mongoose'))

mongoose.connect(MONGODB_URI)

// Get the default connection
const db = mongoose.connection
// export default { db }

// When successfully connected
db.on('connected', () => {
  console.log(`Mongoose default connection open to ${MONGODB_URI}`)

  // If db connected successfuly - start app
  const app = express()

  // flow-disable-next-line
  const http = Server(app)
  const io = socketIO(http)
  setUpSocket(io)

  // configure app to use bodyParser()to get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // Use compression (gzip)
  app.use(compression())
  app.use(STATIC_PATH, express.static('dist'))
  app.use(STATIC_PATH, express.static('public'))

  routing(app)

  http.listen(WEB_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
      '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
  })
})

// OTHER CONNECTION EVENTS
// If the connection throws an error
db.on('error', (err) => {
  console.log(err)
  process.exit(1)
})

// When the connection is disconnected
db.on('disconnected', () => {
  console.log('Mongoose default connection disconnected')
  process.exit(1)
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})
/* eslint-enable no-console */
