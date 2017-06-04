import mongoose from 'mongoose'
import Relation from '../model/relation'

import {
  HTTP_OK,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
} from '../../../shared/config'

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

mongoose.set('debug', true)

exports.findAll = (req, res) => {
  Relation.find({}, (err, relation) => {
    if (err) {
      res.status(HTTP_NOT_FOUND).send(err)
    }
    res.status(HTTP_OK).json(relation)
  })
}

exports.findById = (req, res) => {
  if (req.param.id) {
    Relation.findById(req.params.id, (err, relation) => {
      if (err) {
        res.status(HTTP_NOT_FOUND).send(err)
      } else {
        res.json(relation)
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No relation id')
  }
}

exports.add = (req, res) => {
  const newRelation = new Relation(req.body.relation)
  // if (req.body.relation.uuid !== ('' || null)) {
  //   newRelation._id = req.body.relation.uuid
  // }
  try {
    newRelation.save((err) => {
      if (err) {
        res.send(err)
      } else {
        res.status(HTTP_CREATED).json({ message: 'Relation added!' })
      }
    })
  } catch (ex) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).send(ex)
  }
}

exports.addMany = (req, res) => {
  if (req.body.relations) {
    try {
      Relation.insertMany(req.body.relations, (err, relations) => {
        if (err) {
          res.send(err)
        } else {
          res.status(HTTP_CREATED).json({ message: `${relations.length} relations added!` })
        }
      })
    } catch (ex) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).send(ex)
    }
  }
}

exports.update = (req, res, next) => {
  if (req.params.id) {
    Relation.findOneAndUpdate(req.params.id, req.body.relation, { new: true }, (err, relation) => {
      if (err) {
        return res.status(HTTP_NOT_FOUND).send(err)
      }
      req.relation = relation
      // res.status(HTTP_OK).json(relation)
      return next()
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No relation id')
  }
}

exports.sync = (req, res, next) => {
  if (!req.body.known_relations) {
    return res.status(HTTP_BAD_REQUEST).send('No relation id')
  }
  const nodeRelations = req.body.relations
  for (let i = 0, len = nodeRelations.length; i < len; i += 1) {
    Relation.findOne({ node: nodeRelations[i].node }, (err, srvRelations) => {
      if (err) {
        res.status(HTTP_NOT_FOUND).send(err)
      } else {
        // Make sure the node is listed in the relations schema
        if (!srvRelations) {
          srvRelations.set(nodeRelations[i])
        }

        // Update the friends list if it is outdated
        if (nodeRelations[i].timeStamp > srvRelations.timeStamp) {
          srvRelations.friends.set(nodeRelations[i].friends)
          srvRelations.timeStamp.set(nodeRelations[i].timeStamp)
        }
        srvRelations.save((error) => {
          if (error) { res.status(HTTP_INTERNAL_SERVER_ERROR).send(error) }
        })
      }
    })
  }
  return next()
}

exports.delete = (req, res) => {
  if (req.params.id) {
    Relation.remove({
      _id: req.params.id,
    }, (err) => {
      if (err) {
        res.status(HTTP_NOT_FOUND).send(err)
      } else {
        res.status(HTTP_OK).json({ message: `Relation ${req.param.id} successfully deleted` })
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No relation id')
  }
}
