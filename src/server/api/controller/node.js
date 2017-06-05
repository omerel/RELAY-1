import mongoose from 'mongoose'
import Node from '../model/node'
import rank from './rank'

import {
  HTTP_OK,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
} from '../../../shared/config'

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

mongoose.set('debug', true)

exports.findAll = (req, res/* , next*/) => {
  Node.find({}, (err, nodes) => {
    if (err) {
      return res.status(HTTP_NOT_FOUND).send(err)
    }
    req.nodes = nodes
    return res.status(HTTP_OK).json(nodes)
    // next()
  })
}

exports.findById = (req, res, next) => {
  if (req.params.id) {
    Node.findOne({ _id: req.params.id }, (err, node) => {
      if (err) {
        return res.status(HTTP_NOT_FOUND).send(err)
      }
      req.node = node
      // res.status(HTTP_OK).json(node)
      return next()
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No node id')
  }
}

exports.add = (req, res) => {
  if (req.body.node.mId !== ('' || null)) {
    req.body.node._id = req.body.node.mId
  }
  const newNode = new Node(req.body.node)
  newNode.mRank = rank.calcRank(newNode.mId)
  newNode.mTimeStampRankFromServer = new Date()
  try {
    newNode.save((err) => {
      if (err) {
        return res.send(err)
      }
      return res.status(HTTP_CREATED).json({ message: 'Node added!' })
    })
  } catch (ex) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).send(ex)
  }
}

exports.update = (req, res, next) => {
  if (req.params.id) {
    // if (req.body.node.mId !== ('' || null)) {
    //   req.body.node._id = req.body.node.mId
    // }
    const newNode = new Node(req.body.node)
    newNode.mRank = rank.calcRank(newNode._id)
    newNode.mTimeStampRankFromServer = new Date()
    Node.findOneAndUpdate(req.params.id, req.body.node, { new: true, upsert: true },
    (err, node) => {
      if (err) {
        return res.status(HTTP_NOT_FOUND).send(err)
      }
      req.node = node
      // res.status(HTTP_OK).json(node)
      return next()
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No node id')
  }
}

exports.delete = (req, res) => {
  if (req.params.id) {
    Node.remove({
      _id: req.params.id,
    }, (err) => {
      if (err) {
        return res.send(err)
      }
      return res.status(HTTP_OK).json({ message: `Node ${req.params.id} successfully deleted` })
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No node id')
  }
}
