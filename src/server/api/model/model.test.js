import mongoose from 'mongoose'
// import { NodeSchema } from './node'
// import { MessageSchema } from './message'
// import { HandShakeSchema, HandShakeEventSchema } from './handshake'
import { DEFAULT_RANK,
  STATUS_MESSAGE_CREATED,
  // STATUS_MESSAGE_SENT,
  // STATUS_MESSAGE_RECEIVED_IN_SERVER,
  // STATUS_MESSAGE_DELIVERED,
  TYPE_MESSAGE_TEXT,
  // TYPE_MESSAGE_INCLUDE_ATTACHMENT,
 } from '../../../shared/config'

require('./node')
require('./message')
require('./handshake')

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

test('Check Node Schema', () => {
  const Node = mongoose.model('Nodes')
  const newNode = new Node({
    _id: '592a9e2b13928b85d225b55f',
    timeStampNodeDetails: new Date(),
    timeStampNodeRelations: new Date(),
    rank: {},
    email: 'a@gmail.com',
    phoneNumber: '050-5050505',
    userName: 'Moshe',
    fullName: 'Cohen',
    profilePicture: {},
    residenceCode: {},
    timeStampRankFromServer: {},
  })

  expect(newNode._id).toBe('592a9e2b13928b85d225b55f')
  expect(newNode.rank).toBe(DEFAULT_RANK)
})

test('Check Message Schema', () => {
  const Message = mongoose.model('Messages')
  const newMessage = new Message({
    _id: '592a9e2b13928b85d225b55f',
    timeCreated: new Date(),
    status: STATUS_MESSAGE_CREATED,
    senderId: String,
    destinationId: String,
    type: TYPE_MESSAGE_TEXT,
    content: 'Hello World',
    attachment: {},
  })

  expect(newMessage._id).toBe('592a9e2b13928b85d225b55f')
  expect(newMessage.content).toBe('Hello World')
})

test('Check Handshake Schema', () => {
  const Handshake = mongoose.model('Handshakes')
  const newHandshake = new Handshake({
    handShakeRank: {},
    handShakeCounter: 2,
    handShakeEventLog: [{ geoLocation: '2000222211', timeStamp: new Date() },
      { geoLocation: '2000222212', timeStamp: new Date() - 1 }],
  })

  expect(newHandshake.handShakeRank).toBe(DEFAULT_RANK)
  expect(newHandshake.handShakeEventLog[1].geoLocation).toBe('2000222212')
})
