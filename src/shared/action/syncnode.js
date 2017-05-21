// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { syncNodeRoute } from '../../shared/routes'

export const PERFORM_SYNC_NODE = 'PERFORM_SYNC_NODE'
export const PERFORM_SYNC_NODE_ASYNC_REQUEST = 'PERFORM_SYNC_NODE_ASYNC_REQUEST'
export const PERFORM_SYNC_NODE_ASYNC_SUCCESS = 'PERFORM_SYNC_NODE_ASYNC_SUCCESS'
export const PERFORM_SYNC_NODE_ASYNC_FAILURE = 'PERFORM_SYNC_NODE_ASYNC_FAILURE'

export const performSyncNode = createAction(PERFORM_SYNC_NODE)
export const performSyncNodeAsyncRequest = createAction(PERFORM_SYNC_NODE_ASYNC_REQUEST)
export const performSyncNodeAsyncSuccess = createAction(PERFORM_SYNC_NODE_ASYNC_SUCCESS)
export const performSyncNodeAsyncFailure = createAction(PERFORM_SYNC_NODE_ASYNC_FAILURE)

export const performSyncNodeAsync = (str: string) => (dispatch: Function) => {
  dispatch(performSyncNodeAsyncRequest())
  return fetch(syncNodeRoute(str), { method: 'GET' })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((data) => {
      if (!data.serverMessage) throw Error('No message received')
      dispatch(performSyncNodeAsyncSuccess(data.serverMessage))
    })
    .catch(() => {
      dispatch(performSyncNodeAsyncFailure())
    })
}
