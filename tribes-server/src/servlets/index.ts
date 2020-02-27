import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

import Logger from 'ap-utils-logger'

import {
  users
} from '../database/schemas'

import {
  decodeBasicHeader,
  HttpHeader,
  HttpMethod,
  HttpStatus,
} from '../utils'

import addEventsRoutes from './rest/events'
import addFriendshipsRoutes from './rest/friendships'
import addMembershipsRoutes from './rest/memberships'
import addMessagesRoutes from './rest/messages'
import addThreadsRoutes from './rest/threads'
import addTribesRoutes from './rest/tribes'
import addUsersRoutes from './rest/users'

const LOGGER = new Logger('SERVER-REST')

export const useHeaders = (req: any, res: any, next: any) => {
  LOGGER.debug('useHeaders')
  res.setHeader(
    HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN,
    '*'
  )
  res.setHeader(
    HttpHeader.ACCESS_CONTROL_ALLOW_HEADERS,
    [
      'Origin',
      'Accept',
      'Accept-Version',
      'Content-Length',
      'Content-MD5',
      'Content-Type',
      'Date',
      'Authorization'
    ].join(',')
  )
  res.setHeader(
    HttpHeader.ACCESS_CONTROL_ALLOW_METHODS,
    [
      HttpMethod.GET,
      HttpMethod.POST,
      HttpMethod.PUT,
      HttpMethod.PATCH,
      HttpMethod.DELETE,
      HttpMethod.OPTIONS
    ].join(',')
  )
  return next()
}

export const useAuth = function(req: any, res: any, next: any) {
  LOGGER.debug('useAuth')
  const user = decodeBasicHeader(req.headers.authorization)
  users.findOne(user).select('-_id -__v').exec((err, data) => {
    if (err) {
      res.status(HttpStatus.ERROR).send(err)
    } else if (data) {
      req.__context = data
      next()
    } else {
      res.status(HttpStatus.FORBIDDEN).send({ error: 'FORBIDDEN' })
    }
  })
}

export const getAuth = (req: any, res: any, next: any) => {
  LOGGER.debug('getAuth')
  res.status(HttpStatus.OK).send(req.__context)
}

export const optionsRoute = (req: any, res: any, next: any) => {
  LOGGER.debug('optionsRoute')
  res.sendStatus(HttpStatus.OK)
}

const app = express()

app.use(express.static('public'))

app.use(useHeaders)

app.options('*', optionsRoute)

app.use(useAuth)

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Auth end point
app.get('/auth', getAuth)

addEventsRoutes(app)
addFriendshipsRoutes(app)
addMembershipsRoutes(app)
addMessagesRoutes(app)
addThreadsRoutes(app)
addTribesRoutes(app)
addUsersRoutes(app)

export default app
