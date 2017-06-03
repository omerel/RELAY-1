import mongoose from 'mongoose'

import { DEFAULT_RANK } from '../../../shared/config'

const Schema = mongoose.Schema

const nodeSchema = new Schema({
  uuid: { type: String, unique: true },
  timeStampNodeDetails: { type: Date, default: Date.Now },
  timeStampNodeRelations: { type: Date, default: Date.Now },
  rank: { type: Number, default: DEFAULT_RANK },
  email: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  userName: { type: String, default: '' },
  fullName: { type: String, default: '' },
  profilePicture: Buffer,
  residenceCode: Number,
  timeStampRankFromServer: { type: Date, default: Date.Now },
})

module.exports = mongoose.model('nodes', nodeSchema)
