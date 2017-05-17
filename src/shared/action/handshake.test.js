import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import {
  performHandshakeAsync,
  performHandshakeAsyncRequest,
  performHandshakeAsyncSuccess,
  performHandshakeAsyncFailure,
} from './handshake'

import { handshakeRoute } from '../../shared/routes'

const mockStore = configureMockStore([thunkMiddleware])

afterEach(() => {
  fetchMock.restore()
})

test('handshakeRoute success', () => {
  fetchMock.get(handshakeRoute('Moshe'), { serverMessage: 'Async handshake success' })
  const store = mockStore()
  return store.dispatch(performHandshakeAsync('Moshe'))
    .then(() => {
      expect(store.getActions()).toEqual([
        performHandshakeAsyncRequest(),
        performHandshakeAsyncSuccess('Async handshake success'),
      ])
    })
})

test('performHandshakeAsync 404', () => {
  fetchMock.get(handshakeRoute('Moshe'), 404)
  const store = mockStore()
  return store.dispatch(performHandshakeAsync('Moshe'))
    .then(() => {
      expect(store.getActions()).toEqual([
        performHandshakeAsyncRequest(),
        performHandshakeAsyncFailure(),
      ])
    })
})

test('performHandshakeAsync data error', () => {
  fetchMock.get(handshakeRoute('Moshe'), {})
  const store = mockStore()
  return store.dispatch(performHandshakeAsync('Moshe'))
    .then(() => {
      expect(store.getActions()).toEqual([
        performHandshakeAsyncRequest(),
        performHandshakeAsyncFailure(),
      ])
    })
})
