// @flow
import mongoose from 'mongoose'
import rules from '../model/rules'

// import {
//   HTTP_OK,
//   // HTTP_CREATED,
//   HTTP_NOT_FOUND,
//   HTTP_BAD_REQUEST,
//   // HTTP_INTERNAL_SERVER_ERROR,
// } from '../../../shared/config'

import { DEFAULT_RANK } from '../../../shared/config'

mongoose.set('debug', true)

exports.calcRank = (nodeId: String) => {
  // Get rules
  rules.get(() => {
    // calcMSBN * MSBNr + calcMSNS * MSNSr
    // TODO: save all syncs with server
    // TODO: retrieve sync with server
    // TODO: save max sync with server and max handshake counter
    let rank = DEFAULT_RANK
    if (nodeId != null) {
      rank = 3
    }
    rank = 2
    return rank
  })
}
