// import { helloEndpointRoute } from './routes'
import {
  helloEndpointRoute,
  syncNodeRoute,
} from './routes'

test('helloEndpointRoute', () => {
  expect(helloEndpointRoute()).toBe('/ajax/hello/:num')
  expect(helloEndpointRoute(123)).toBe('/ajax/hello/123')
})

test('syncNodeRoute', () => {
  expect(syncNodeRoute()).toBe('/api/syncnode/:metadata')
  expect(syncNodeRoute('02:00:00:00:00:00')).toBe('/api/syncnode/02:00:00:00:00:00')
})
