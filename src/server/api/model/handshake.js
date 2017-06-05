import mongoose from 'mongoose'

import {
  DEFAULT_RANK,
} from '../../../shared/config'

const Schema = mongoose.Schema

// const HandShakeEventSchema = new Schema({
//   geoLocation: String,
//   timeStamp: Date,
// })

const HandShakeSchema = new Schema({
  // nodeA: { type: mongoose.Schema.Types.ObjectId, ref: 'nodes' },
  // nodeB: { type: mongoose.Schema.Types.ObjectId, ref: 'nodes' },
  mHandShakeRank: { type: Number, default: DEFAULT_RANK, require: true },
  mHandShakeCounter: { type: Number, min: 0, default: 0 },
  // handShakeEvents: [HandShakeEventSchema],
  mHandShakeEvents: [{ geoLocation: String, timeStamp: Date }],
})

module.exports = mongoose.model('handshakes', HandShakeSchema)
