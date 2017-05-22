import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NodeSchema = new Schema({
  id: String,
  timeStampNodeDetails: Date,
  timeStampNodeRelations: Date,
  rank: Number,
  email: String,
  phoneNumber: String,
  mUserName: String,
  fullName: String,
  profilePicture: Buffer,
  residenceCode: Number,
  timeStampRankFromServer: Date,
})

module.exports = mongoose.model('Nodes', NodeSchema)
