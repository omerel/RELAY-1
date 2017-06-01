import mongoose from 'mongoose'
import Node from '../model/node'
import rank from './rank'
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import {
  HTTP_OK,
  HTTP_CREATED,
  // HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  // HTTP_INTERNAL_SERVER_ERROR,
} from '../../../shared/config'

mongoose.set('debug', true)

exports.findAll = (req, res) => {
  Node.find({}, (err, nodes) => {
    if (err) {
      res.send(err)
    } else {
      res.status(HTTP_OK).json(nodes)
    }
  })
}

exports.findById = (req, res) => {
  if (req.params.id) {
    Node.findOne({ _id: req.params.id }, (err, node) => {
      if (err) {
        res.send(err)
      } else {
        res.status(HTTP_OK).json(node)
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No node id')
  }
}

exports.add = (req, res) => {
  const newNode = new Node(req.body)
  if (req.body.uuid !== ('' || null)) {
    newNode._id = req.body.uuid
  }
  newNode.rank = rank.calcRank(newNode._id)
  newNode.timeStampRankFromServer = new Date()
  try {
    newNode.save((err) => {
      if (err) {
        res.send(err)
      } else {
        res.status(HTTP_CREATED).json({ message: 'Node added!' })
      }
    })
  } catch (ex) {
    res.send(ex)
  }
}

exports.update = (req, res) => {
  Node.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, node) => {
    if (err) {
      res.send(err)
    } else {
      res.status(HTTP_OK).json(node)
    }
  })
}

exports.delete = (req, res) => {
  Node.remove({
    _id: req.params.id,
  }, (err) => {
    if (err) {
      res.send(err)
    } else {
      res.status(HTTP_OK).json({ message: `Node ${req.params.id} successfully deleted` })
    }
  })
}
