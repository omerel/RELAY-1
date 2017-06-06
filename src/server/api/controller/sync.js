import mongoose from 'mongoose'
// import Node from '../model/node'
// import rank from './rank'

import node from './node'
import syncHistory from './syncHistory'
import relations from './relation'
import messages from './message'
// import handshake from './api/controller/handshake'
// import rules from './api/controller/rules'

import {
  HTTP_OK,
  // HTTP_CREATED,
  // HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  // HTTP_INTERNAL_SERVER_ERROR,
} from '../../../shared/config'

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

mongoose.set('debug', true)

exports.validateMetadata = (req, res, next) => {
  if (req.params.id && req.body.myNode) {
    req.body.node = req.body.myNode
    req.body.node._id = req.params.id
    return next()
  }
  return next(new Error('Node not supplemented'))
}

// SyncMetadata
exports.metadata = (req, res) => {
  if (req.params.id && req.body.myNode) {
    req.body.node = req.body.myNode
    node.update()
    req.res.mRank = req.node.mRank
    req.res.mTimeStampRankFromServer = req.node.mTimeStampRankFromServer
    node.graph()
    console.log(req.graph)
    req.res.graph = req.graph
        // messages.syncMetadata(() => {
        //   req.res.knownMessagesList = req.knownMessagesList
        //   relations.sync(() => {
        //     req.res.knownRelationsList = req.res.knownRelationsList
        //     res.status(HTTP_OK).json(req.res)
        //   })
        // })
    return res.status(HTTP_OK).send({ rank: req.node.mRank,
      mTimeStampRankFromServer: req.node.mTimeStampRankFromServer,
      knownMessagesList: req.knownMessagesList,
      knownRelationsList: req.knownRelationsList })
  }
  return res.status(HTTP_BAD_REQUEST).json('Missing node to sync')
}

// Metadata (node, known_relation, known_messages)
// response: (rank, rankTimestamp, known_relations, known_messages)
exports.data = (req, res, next) => {
  if (req.params.id && req.body.node) {
    // Sync body contains:
    // nodeList [nodes]
    // relationsList [relations]
    // updateMessages [messages]
    // req.body.node._id = req.params.id
    node.update(
      syncHistory.addEvent(
        relations.sync(
          messages.sync(
            res.status(HTTP_OK).json(node.collection.aggregate([
              { $match: { node: req.body.node } }, // Only look at Luke Skywalker
              {
                $graphLookup: {
                  from: 'relations', // Use the relations collection
                  startWith: '$friends', // Start looking at the document's `friends` property
                  connectFromField: 'friends', // A link in the graph is represented by the friends property...
                  connectToField: '_id', // ... pointing to another node's _id property
                  maxDepth: 1, // Only recurse one level deep
                  as: 'relations', // Store this in the `relations` property
                },
              },
            ]),
            // If no name, phone, etc it is a mail - don't update the collection - send e-mail
            // Response:
            // Rank
            // Relations (delta by rank)
            // Messages (delta)
            // Status OK
    )))))
  }
  return next()
}
