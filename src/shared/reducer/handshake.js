// @flow

import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'

import {
    PERFORM_HANDSHAKE,
    PERFORM_HANDSHAKE_ASYNC_REQUEST,
    PERFORM_HANDSHAKE_ASYNC_SUCCESS,
    PERFORM_HANDSHAKE_ASYNC_FAILURE,
} from '../action/handshake'

const initialState = Immutable.fromJS({
  message: 'Initial reducer message',
  messageAsync: 'Initial reducer message for async call',
})

const handshakeReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case PERFORM_HANDSHAKE:
      return state.set('message', action.payload)
    case PERFORM_HANDSHAKE_ASYNC_REQUEST:
      return state.set('messageAsync', 'Syncing...')
    case PERFORM_HANDSHAKE_ASYNC_SUCCESS:
      return state.set('messageAsync', action.payload)
    case PERFORM_HANDSHAKE_ASYNC_FAILURE:
      return state.set('messageAsync', 'No message received, please check your connection')
    default:
      return state
  }
}

export default handshakeReducer
