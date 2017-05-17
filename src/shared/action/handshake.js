// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { handshakeRoute } from '../../shared/routes'

export const PERFORM_HANDSHAKE = 'PERFORM_HANDSHAKE'
export const PERFORM_HANDSHAKE_ASYNC_REQUEST = 'PERFORM_HANDSHAKE_ASYNC_REQUEST'
export const PERFORM_HANDSHAKE_ASYNC_SUCCESS = 'PERFORM_HANDSHAKE_ASYNC_SUCCESS'
export const PERFORM_HANDSHAKE_ASYNC_FAILURE = 'PERFORM_HANDSHAKE_ASYNC_FAILURE'

export const performHandshake = createAction(PERFORM_HANDSHAKE)
export const performHandshakeAsyncRequest = createAction(PERFORM_HANDSHAKE_ASYNC_REQUEST)
export const performHandshakeAsyncSuccess = createAction(PERFORM_HANDSHAKE_ASYNC_SUCCESS)
export const performHandshakeAsyncFailure = createAction(PERFORM_HANDSHAKE_ASYNC_FAILURE)

export const performHandshakeAsync = (str: string) => (dispatch: Function) => {
  dispatch(performHandshakeAsyncRequest())
  return fetch(handshakeRoute(str), { method: 'GET' })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((data) => {
      if (!data.serverMessage) throw Error('No message received')
      dispatch(performHandshakeAsyncSuccess(data.serverMessage))
    })
    .catch(() => {
      dispatch(performHandshakeAsyncFailure())
    })
}
