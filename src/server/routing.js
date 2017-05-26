// @flow

import {
  homePage,
  helloPage,
  helloAsyncPage,
  helloEndpoint,
} from './controller'

import node from './api/controller/node'
import message from './api/controller/message'
import handshake from './api/controller/handshake'

import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  helloEndpointRoute,
  NODE_API_ROUTE,
  // GRAPH_API_ROUTE,
  MESSAGE_API_ROUTE,
  HANDSHAKE_API_ROUTE,
} from '../shared/routes'

import renderApp from './render-app'

export default (app: Object) => {
  // Restful API routes
  app.route(NODE_API_ROUTE)
      .get(node.findAll)
      .post(node.add)

  app.route(`${NODE_API_ROUTE}/:id`)
      .get(node.find)
      .put(node.update)
      .delete(node.delete)

  app.route(MESSAGE_API_ROUTE)
      .get(message.findAll)
      .post(message.add)

  app.route(`${MESSAGE_API_ROUTE}/:id`)
      .get(message.find)
      .put(message.update)
      .delete(message.delete)

  app.route(HANDSHAKE_API_ROUTE)
      .get(handshake.findAll)
      .post(handshake.add)

  app.route(`${HANDSHAKE_API_ROUTE}/:id`)
      .get(handshake.find)
      .put(handshake.update)
      .delete(handshake.delete)

  // Web app routes
  app.get(HOME_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, homePage()))
  })

  app.get(HELLO_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, helloPage()))
  })

  app.get(HELLO_ASYNC_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, helloAsyncPage()))
  })

  app.get(helloEndpointRoute(), (req, res) => {
    res.json(helloEndpoint(req.params.num))
  })

  app.get('/500', () => {
    throw Error('Fake Internal Server Error')
  })

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url))
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
    next()
  })
}
