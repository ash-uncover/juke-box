import * as express from 'express'
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

const LOGGER = new Logger('server')

export const useHeaders = (req: any, res: any, next: any) => {
  LOGGER.debug('useHeaders')
  res.setHeader(
    HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN,
    '*'
  )
  res.setHeader(
    HttpHeader.ACCESS_CONTROL_ALLOW_HEADERS,
    'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Authorization'
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
  res.sendStatus(HttpStatus.OK)
}

export const optionsRoute = (req: any, res: any, next: any) => {
  LOGGER.debug('optionsRoute')
  res.sendStatus(HttpStatus.OK)
}

const server = express()

server.use(useHeaders)

server.options('*', optionsRoute)

server.use(useAuth)

// Auth end point
server.get('/auth', getAuth)

// Users end point
server.get('/rest/users', getUsers)
server.post('/rest/users', postUser)
server.get('/rest/users/:userId', getUser)
server.put('/rest/users/:userId', putUser)
server.patch('/rest/users/:userId', patchUser)
server.delete('/rest/users/:userId', deleteUser)
server.get('/rest/users/:userId/memberships', getUserMemberships)

// Tribes end point
server.get('/rest/tribes', getTribes)
server.post('/rest/tribes', postTribe)
server.get('/rest/tribes/:tribeId', getTribe)
server.put('/rest/tribes/:tribeId', putTribe)
server.patch('/rest/tribes/:tribeId', patchTribe)
server.delete('/rest/tribes/:tribeId', deleteTribe)
server.get('/rest/tribes/:tribeId/memberships', getTribeMemberships)

// Memberships end point
server.post('/rest/memberships/', postMembership)
server.get('/rest/memberships/:membershipId', getMembership)
server.put('/rest/memberships/:membershipId', putMembership)
server.patch('/rest/memberships/:membershipId', patchMembership)
server.delete('/rest/memberships/:membershipId', deleteMembership)

const PORT = process.env.PORT || 3090;

const startup = () => {
  const app = server.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
  })
  app.on('close', () => {
    LOGGER.debug('Server Shutting down')
  })
  return app
}

export default startup
