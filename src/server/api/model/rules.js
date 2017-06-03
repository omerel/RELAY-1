import mongoose from 'mongoose'

import {
  DEFAULT_MSBN_DURATION,
  DEFAULT_MSNS_DURATION,
  DEFAULT_MSBN_RATIO,
  DEFAULT_MSNS_RATIO,
  DEFAULT_MESSAGE_TTL,
  DEFAULT_RANDOM_NODE_TIME,
} from '../../../shared/config'

const Schema = mongoose.Schema

const rulesSchema = new Schema({
  MSBNDuration: { type: Number, min: 0, default: DEFAULT_MSBN_DURATION },
  MSNSDuration: { type: Number, min: 0, default: DEFAULT_MSNS_DURATION },
  MSBNRatio: { type: String, default: DEFAULT_MSBN_RATIO }, // No float in mongoose
  MSNSRatio: { type: String, default: DEFAULT_MSNS_RATIO }, // No float in mongoose
  MessageTTL: { type: Number, min: 0, default: DEFAULT_MESSAGE_TTL },
  RandomNodeTime: { type: Number, min: 0, default: DEFAULT_RANDOM_NODE_TIME },
})

module.exports = mongoose.model('rules', rulesSchema)
