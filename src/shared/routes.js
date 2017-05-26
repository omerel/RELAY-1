// @flow

// Web
export const HOME_PAGE_ROUTE = '/'
export const HELLO_PAGE_ROUTE = '/hello'
export const HELLO_ASYNC_PAGE_ROUTE = '/hello-async'
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404'

// API
export const NODE_API_ROUTE = '/api/node'
export const GRAPH_API_ROUTE = '/api/graph'
export const MESSAGE_API_ROUTE = '/api/message'
export const HANDSHAKE_API_ROUTE = '/api/handshake'

export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`
