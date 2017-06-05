import mongoose from 'mongoose'

import {
  STATUS_MESSAGE_CREATED,
  STATUS_MESSAGE_SENT,
  STATUS_MESSAGE_RECEIVED_IN_SERVER,
  STATUS_MESSAGE_DELIVERED,
  TYPE_MESSAGE_TEXT,
  TYPE_MESSAGE_INCLUDE_ATTACHMENT,
} from '../../../shared/config'

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  mId: { type: String, unique: true },
  mTimeCreated: Date,
  mStatus: { type: Number,
    enum: [STATUS_MESSAGE_CREATED,
      STATUS_MESSAGE_SENT,
      STATUS_MESSAGE_RECEIVED_IN_SERVER,
      STATUS_MESSAGE_DELIVERED],
  },
  mSenderId: String /* { type: mongoose.Schema.Types.ObjectId, ref: 'nodes' }*/,
  mDestinationId: String /* { type: mongoose.Schema.Types.ObjectId, ref: 'nodes' }*/,
  mType: {
    type: Number,
    enum: [TYPE_MESSAGE_TEXT,
      TYPE_MESSAGE_INCLUDE_ATTACHMENT],
  },
  mContent: String,
  mAttachment: Buffer,
})

// module.exports = mongoose.model('Messages', MessageSchema)
module.exports = mongoose.model('messages', MessageSchema)
