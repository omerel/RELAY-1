import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import {
  performSyncNodeAsync,
  performSyncNodeAsyncRequest,
  performSyncNodeAsyncSuccess,
  performSyncNodeAsyncFailure,
} from './syncnode'

import { syncNodeRoute } from '../../shared/routes'

const mockStore = configureMockStore([thunkMiddleware])

afterEach(() => {
  fetchMock.restore()
})

test('syncNodeRoute success', () => {
  fetchMock.get(syncNodeRoute('Moshe'), { serverMessage: 'Async sync node success' })
  const store = mockStore()
  return store.dispatch(performSyncNodeAsync('Moshe'))
    .then(() => {
      expect(store.getActions()).toEqual([
        performSyncNodeAsyncRequest(),
        performSyncNodeAsyncSuccess('Async sync node success'),
      ])
    })
})

test('performSyncNodeAsync 404', () => {
  fetchMock.get(syncNodeRoute('Moshe'), 404)
  const store = mockStore()
  return store.dispatch(performSyncNodeAsync('Moshe'))
    .then(() => {
      expect(store.getActions()).toEqual([
        performSyncNodeAsyncRequest(),
        performSyncNodeAsyncFailure(),
      ])
    })
})

test('performSyncNodeAsync data error', () => {
  fetchMock.get(syncNodeRoute('Moshe'), {})
  const store = mockStore()
  return store.dispatch(performSyncNodeAsync('Moshe'))
    .then(() => {
      expect(store.getActions()).toEqual([
        performSyncNodeAsyncRequest(),
        performSyncNodeAsyncFailure(),
      ])
    })
})
