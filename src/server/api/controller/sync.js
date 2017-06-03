import mongoose from 'mongoose'
import Node from '../model/node'
import rank from './rank'

import {
  HTTP_OK,
  // HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  // HTTP_INTERNAL_SERVER_ERROR,
} from '../../../shared/config'

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

mongoose.set('debug', true)

exports.sync = (req, res) => {
  // Update Node
  if (req.params.id) {
    const newNode = new Node(req.body)
    if (req.body.uuid !== ('' || null)) {
      newNode._id = req.body.uuid
    }
    newNode.rank = rank.calcRank(newNode._id)
    newNode.timeStampRankFromServer = new Date()
    Node.findOneAndUpdate(req.params.id, req.body, { new: true, upsert: true }, (err, node) => {
      if (err) {
        res.status(HTTP_NOT_FOUND).send(err)
      } else {
        res.status(HTTP_OK).json(node)
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No node id')
  }
}
