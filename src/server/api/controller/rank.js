// @flow

import { DEFAULT_RANK } from '../../../shared/config'

exports.calcRank = (nodeId: String) => {
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
}
