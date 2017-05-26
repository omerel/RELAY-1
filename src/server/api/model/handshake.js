import mongoose from 'mongoose'

import {
  DEFAULT_RANK,
} from '../../../shared/config'

const Schema = mongoose.Schema

const HandShakeEventSchema = new Schema({
  geoLocation: String,
  timeStamp: Date,
})

const HandShakeSchema = new Schema({
  handShakeRank: { type: Number, default: DEFAULT_RANK },
  handShakeCounter: { type: Number, min: 0, default: 0 },
  handShakeEventLog: [HandShakeEventSchema],
})

module.exports = mongoose.model('Handshakes', HandShakeSchema)
