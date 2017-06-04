import mongoose from 'mongoose'
import Message from '../model/message'

import {
  HTTP_OK,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  // STATUS_MESSAGE_CREATED,
  // STATUS_MESSAGE_SENT,
  STATUS_MESSAGE_RECEIVED_IN_SERVER,
  STATUS_MESSAGE_DELIVERED,
  // TYPE_MESSAGE_TEXT,
  // TYPE_MESSAGE_INCLUDE_ATTACHMENT,
} from '../../../shared/config'

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

mongoose.set('debug', true)

exports.findAll = (req, res) => {
  Message.find({}, (err, message) => {
    if (err) {
      res.status(HTTP_NOT_FOUND).send(err)
    }
    res.status(HTTP_OK).json(message)
  })
}

exports.findById = (req, res) => {
  if (req.param.id) {
    Message.findById(req.params.id, (err, message) => {
      if (err) {
        res.status(HTTP_NOT_FOUND).send(err)
      } else {
        res.json(message)
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No message id')
  }
}

exports.add = (req, res) => {
  const newMessage = new Message(req.body.message)
  // if (req.body.message.uuid !== ('' || null)) {
  //   newMessage._id = req.body.message.uuid
  // }
  if (req.body.message.status !== ('' || null) && req.body.message.status !== STATUS_MESSAGE_DELIVERED) {
    newMessage.status = STATUS_MESSAGE_RECEIVED_IN_SERVER
  }
  try {
    newMessage.save((err) => {
      if (err) {
        res.send(err)
      } else {
        res.status(HTTP_CREATED).json({ message: 'Message added!' })
      }
    })
  } catch (ex) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).send(ex)
  }
}

exports.addMany = (req, res) => {
  if (req.body.messages) {
    try {
      Message.insertMany(req.body.messages, (err, messages) => {
        if (err) {
          res.send(err)
        } else {
          res.status(HTTP_CREATED).json({ message: `${messages.length} messages added!` })
        }
      })
    } catch (ex) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).send(ex)
    }
  }
}

exports.update = (req, res) => {
  if (req.params.id) {
    Message.findOneAndUpdate(req.params.id, req.body.message, { new: true }, (err, message) => {
      if (err) {
        res.status(HTTP_NOT_FOUND).send(err)
      } else {
        res.status(HTTP_OK).json(message)
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No message id')
  }
}

exports.sync = (req, res, next) => {
  if (!req.body.known_messages) {
    return res.status(HTTP_BAD_REQUEST).send('No relation id')
  }
  const nodeMessages = req.body.messages
  for (let i = 0, len = nodeMessages.length; i < len; i += 1) {
    Message.findOne({ uuid: nodeMessages[i].uuid }, (err, srvMessage) => {
      if (err) { res.status(HTTP_NOT_FOUND).send(err) }
      if (srvMessage) {
        if (nodeMessages[i].status < STATUS_MESSAGE_RECEIVED_IN_SERVER) {
          srvMessage.status.set(STATUS_MESSAGE_RECEIVED_IN_SERVER)
        } else if (nodeMessages[i].status === STATUS_MESSAGE_DELIVERED) {
          srvMessage.status.set(STATUS_MESSAGE_DELIVERED)
        }
        srvMessage.save((error) => {
          if (error) { res.status(HTTP_INTERNAL_SERVER_ERROR).send(error) }
        })
      }
    })
  }
  return next()
}

exports.delete = (req, res) => {
  if (req.params.id) {
    Message.remove({
      _id: req.params.id,
    }, (err) => {
      if (err) {
        res.status(HTTP_NOT_FOUND).send(err)
      } else {
        res.status(HTTP_OK).json({ message: `Message ${req.param.id} successfully deleted` })
      }
    })
  } else {
    res.status(HTTP_BAD_REQUEST).send('No message id')
  }
}
