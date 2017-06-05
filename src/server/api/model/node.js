import mongoose from 'mongoose'

import { DEFAULT_RANK } from '../../../shared/config'

const Schema = mongoose.Schema

const nodeSchema = new Schema({
  mId: { type: String, unique: true },
  mTimeStampNodeDetails: { type: Date, default: Date.Now },
  mTimeStampNodeRelations: { type: Date, default: Date.Now },
  mRank: { type: Number, default: DEFAULT_RANK },
  mEmail: { type: String, default: '' },
  mPhoneNumber: { type: String, default: '' },
  mUserName: { type: String, default: '' },
  mFullName: { type: String, default: '' },
  mProfilePicture: Buffer,
  mResidenceCode: Number,
  mTimeStampRankFromServer: { type: Date, default: Date.Now },
})

module.exports = mongoose.model('nodes', nodeSchema)
