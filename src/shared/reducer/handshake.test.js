import {
  performHandshake,
  performHandshakeAsyncRequest,
  performHandshakeAsyncSuccess,
  performHandshakeAsyncFailure,
} from '../action/handshake'

import handshakeReducer from './handshake'

let handhsakeState

beforeEach(() => {
  handhsakeState = handshakeReducer(undefined, {})
})

test('handle default', () => {
  expect(handhsakeState.get('message')).toBe('Initial reducer message')
  expect(handhsakeState.get('messageAsync')).toBe('Initial reducer message for async call')
})

test('handle PERFORM_HANDSHAKE', () => {
  handhsakeState = handshakeReducer(handhsakeState, performHandshake('Test'))
  expect(handhsakeState.get('message')).toBe('Test')
})

test('handle PERFORM_HANDSHAKE_ASYNC_REQUEST', () => {
  handhsakeState = handshakeReducer(handhsakeState, performHandshakeAsyncRequest())
  expect(handhsakeState.get('messageAsync')).toBe('Syncing...')
})

test('handle PERFORM_HANDSHAKE_ASYNC_SUCCESS', () => {
  handhsakeState = handshakeReducer(handhsakeState, performHandshakeAsyncSuccess('Test async'))
  expect(handhsakeState.get('messageAsync')).toBe('Test async')
})

test('handle PERFORM_HANDSHAKE_ASYNC_FAILURE', () => {
  handhsakeState = handshakeReducer(handhsakeState, performHandshakeAsyncFailure())
  expect(handhsakeState.get('messageAsync')).toBe('No message received, please check your connection')
})
