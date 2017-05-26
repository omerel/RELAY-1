import mongoose from 'mongoose'

import { DEFAULT_RANK } from '../../../shared/config'

const Schema = mongoose.Schema

const NodeSchema = new Schema({
  id: String,
  timeStampNodeDetails: { type: Date, default: Date.Now },
  timeStampNodeRelations: { type: Date, default: Date.Now },
  rank: { type: Number, default: DEFAULT_RANK },
  email: String,
  phoneNumber: String,
  userName: String,
  fullName: String,
  profilePicture: Buffer,
  residenceCode: Number,
  timeStampRankFromServer: { type: Date, default: Date.Now },
})

module.exports = mongoose.model('Nodes', NodeSchema)
