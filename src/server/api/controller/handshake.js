import mongoose from 'mongoose'

import Handshake from '../model/handshake'

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
  Handshake.find({}, (err, handshakes) => {
    if (err) {
      res.status(HTTP_NOT_FOUND).send(err)
    } else {
      res.status(HTTP_OK).json(handshakes)
    }
  })
}

exports.findById = (req, res) => {
  if (req.params.id) {
    Handshake.findOne({ _id: req.params.id }, (err, handshake) => {
      if (err) {
        res.status(HTTP_NOT_FOUND).send(err)
      } else {
        res.status(HTTP_OK).json(handshake)
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No handshake id')
  }
}

exports.add = (req, res) => {
  const newHandshake = new Handshake(req.body)
  // if (req.body.uuid !== ('' || null)) {
  //   newHandshake._id = req.body.uuid
  // }
  try {
    newHandshake.save((err) => {
      if (err) {
        res.send(err)
      } else {
        res.status(HTTP_CREATED).json({ message: 'Handshake added!' })
      }
    })
  } catch (ex) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).send(ex)
  }
}

exports.addMany = (req, res) => {
  if (req.body.handshakes) {
    try {
      Handshake.insertMany(req.body.handshakes, (err, handshakes) => {
        if (err) {
          res.send(err)
        } else {
          res.status(HTTP_CREATED).json({ message: `${handshakes.length} handshakes added!` })
        }
      })
    } catch (ex) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).send(ex)
    }
  }
}

exports.update = (req, res) => {
  if (req.params.id) {
    Handshake.findOneAndUpdate(req.params.id, req.body,
    { new: true, upsert: true }, (err, handshake) => {
      if (err) {
        res.status(HTTP_NOT_FOUND).send(err)
      } else {
        res.status(HTTP_OK).json(handshake)
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No handshake id')
  }
}

exports.delete = (req, res) => {
  if (req.params.id) {
    Handshake.remove({
      _id: req.params.id,
    }, (err) => {
      if (err) {
        res.send(err)
      } else {
        res.status(HTTP_OK).json({ message: `Handshake ${req.params.id} successfully deleted` })
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No handshake id')
  }
}
