import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SyncHistorySchema = new Schema({
  node: { type: mongoose.Schema.Types.ObjectId, ref: 'nodes' },
  syncsCounter: { type: Number, min: 0, default: 0 },
  syncEvents: [{ timeStamp: Date }],
})

module.exports = mongoose.model('syncHistory', SyncHistorySchema)
