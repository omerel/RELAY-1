import mongoose from 'mongoose'

import SyncHistory from '../model/syncHistory'

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import {
  HTTP_OK,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
} from '../../../shared/config'

mongoose.set('debug', true)

exports.findAll = (req, res) => {
  SyncHistory.find({}, (err, syncHistory) => {
    if (err) {
      res.status(HTTP_NOT_FOUND).send(err)
    } else {
      res.status(HTTP_OK).json(syncHistory)
    }
  })
}

exports.findById = (req, res) => {
  if (req.params.id) {
    SyncHistory.findOne({ node: req.params.id }, (err, syncHistory) => {
      if (err) {
        res.status(HTTP_NOT_FOUND).send(err)
      } else {
        req.syncHistory = syncHistory
        res.status(HTTP_OK).json(syncHistory)
        // next()
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No node id')
  }
}

exports.add = (req, res) => {
  const newSyncHistory = new SyncHistory(req.body)
  // if (req.body.uuid !== ('' || null)) {
  //   newSyncHistory._id = req.body.uuid
  // }
  try {
    newSyncHistory.save((err) => {
      if (err) {
        res.send(err)
      } else {
        res.status(HTTP_CREATED).json({ message: 'SyncHistory added!' })
      }
    })
  } catch (ex) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).send(ex)
  }
}

exports.addMany = (req, res) => {
  if (req.body.syncHistory) {
    try {
      SyncHistory.insertMany(req.body.syncHistory, (err, syncHistory) => {
        if (err) {
          res.send(err)
        } else {
          res.status(HTTP_CREATED).json({ message: `${syncHistory.length} syncHistory added!` })
        }
      })
    } catch (ex) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).send(ex)
    }
  }
}

exports.addEvent = (req, res, next) => {
  if (req.params.id) {
    SyncHistory.findOneAndUpdate({ node: req.params.id },
    { $push: { syncEvents: { timestamp: Date.Now() } } },
    { new: true, upsert: true }, (err, syncHistory) => {
      if (err) {
        return res.status(HTTP_NOT_FOUND).send(err)
      }
      req.syncHistory = syncHistory
      // res.status(HTTP_OK).json(syncHistory)
      return next()
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No syncHistory id')
  }
}

exports.update = (req, res) => {
  if (req.params.id) {
    SyncHistory.findOneAndUpdate({ node: req.params.id }, req.body,
    { new: true, upsert: true }, (err, syncHistory) => {
      if (err) {
        res.status(HTTP_NOT_FOUND).send(err)
      } else {
        res.status(HTTP_OK).json(syncHistory)
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No syncHistory id')
  }
}

exports.delete = (req, res) => {
  if (req.params.id) {
    SyncHistory.remove({
      _id: req.params.id,
    }, (err) => {
      if (err) {
        res.send(err)
      } else {
        res.status(HTTP_OK).json({ message: `SyncHistory ${req.params.id} successfully deleted` })
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No syncHistory id')
  }
}
