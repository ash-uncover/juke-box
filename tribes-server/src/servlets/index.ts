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
  HttpStatus
} from '../utils'

import {
  getUsers,
  postUser,
  getUser,
  putUser,
  patchUser,
  deleteUser,
  getUserMemberships
} from './rest/users'

import {
  getTribes,
  postTribe,
  getTribe,
  putTribe,
  patchTribe,
  deleteTribe,
  getTribeMemberships
} from './rest/tribes'

import {
  postMembership,
  getMembership,
  putMembership,
  patchMembership,
  deleteMembership
} from './rest/memberships'

import {
  postFriendship,
  getFriendship,
  patchFriendship,
  deleteFriendship
} from './rest/friendships'

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

// Auth end point
app.get('/auth', getAuth)

// Users end point
app.get('/rest/users', getUsers)
app.post('/rest/users', postUser)
app.get('/rest/users/:userId', getUser)
app.put('/rest/users/:userId', putUser)
app.patch('/rest/users/:userId', patchUser)
app.delete('/rest/users/:userId', deleteUser)
app.get('/rest/users/:userId/memberships', getUserMemberships)

// Tribes end point
app.get('/rest/tribes', getTribes)
app.post('/rest/tribes', postTribe)
app.get('/rest/tribes/:tribeId', getTribe)
app.put('/rest/tribes/:tribeId', putTribe)
app.patch('/rest/tribes/:tribeId', patchTribe)
app.delete('/rest/tribes/:tribeId', deleteTribe)
app.get('/rest/tribes/:tribeId/memberships', getTribeMemberships)

// Memberships end point
app.post('/rest/memberships/', postMembership)
app.get('/rest/memberships/:membershipId', getMembership)
app.put('/rest/memberships/:membershipId', putMembership)
app.patch('/rest/memberships/:membershipId', patchMembership)
app.delete('/rest/memberships/:membershipId', deleteMembership)

export default app
