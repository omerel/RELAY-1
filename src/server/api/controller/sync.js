import mongoose from 'mongoose'
// import Node from '../model/node'
// import rank from './rank'

import node from './node'
// import message from './api/controller/message'
// import handshake from './api/controller/handshake'
// import rules from './api/controller/rules'

import {
  HTTP_OK,
  // HTTP_CREATED,
  // HTTP_NOT_FOUND,
  // HTTP_BAD_REQUEST,
  // HTTP_INTERNAL_SERVER_ERROR,
} from '../../../shared/config'

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

mongoose.set('debug', true)

exports.sync = (req, res) => {
  // Update Node
  // req.params.id = req.body.uuid
  node.update(res.status(HTTP_OK).json(req.node))
}
