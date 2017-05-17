// import { helloEndpointRoute } from './routes'
import {
  helloEndpointRoute,
  handshakeRoute,
} from './routes'

test('helloEndpointRoute', () => {
  expect(helloEndpointRoute()).toBe('/ajax/hello/:num')
  expect(helloEndpointRoute(123)).toBe('/ajax/hello/123')
})

test('handshakeRoute', () => {
  expect(handshakeRoute()).toBe('/api/handshake/:str')
  expect(handshakeRoute('02:00:00:00:00:00')).toBe('/api/handshake/02:00:00:00:00:00')
})
