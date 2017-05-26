// @flow

export const WEB_PORT = process.env.PORT || 8000
export const WDS_PORT = 7000
export const STATIC_PATH = '/static'
export const MONGODB_URI = 'mongodb://localhost/RELAY'
export const APP_NAME = 'RELAY'

export const APP_CONTAINER_CLASS = 'js-app'
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`
export const JSS_SSR_CLASS = 'jss-ssr'
export const JSS_SSR_SELECTOR = `.${JSS_SSR_CLASS}`

export const IO_CONNECT = 'connect'
export const IO_DISCONNECT = 'disconnect'
export const IO_CLIENT_HELLO = 'IO_CLIENT_HELLO'
export const IO_CLIENT_JOIN_ROOM = 'IO_CLIENT_JOIN_ROOM'
export const IO_SERVER_HELLO = 'IO_SERVER_HELLO'

export const STATUS_MESSAGE_CREATED = 99
export const STATUS_MESSAGE_SENT = 100
export const STATUS_MESSAGE_RECEIVED_IN_SERVER = 200
export const STATUS_MESSAGE_DELIVERED = 300
export const TYPE_MESSAGE_TEXT = 11
export const TYPE_MESSAGE_INCLUDE_ATTACHMENT = 12

export const DEFAULT_RANK = 2
