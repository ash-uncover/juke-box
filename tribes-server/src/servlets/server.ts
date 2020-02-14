import * as express from 'express'
import Logger from 'ap-utils-logger'

import { getUsers, postUser, getUser, putUser, patchUser, deleteUser, getUserMemberships } from './rest/users'
import { getTribes, postTribe, getTribe, putTribe, patchTribe, deleteTribe, getTribeMemberships } from './rest/tribes'
import { postMembership, getMembership, putMembership, patchMembership, deleteMembership } from './rest/memberships'

const LOGGER = new Logger('server')

const corsHandler = (req: any, res: any, next: any) => {
  LOGGER.debug('corsHandler')
  console.log('corsHandler')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Authorization')
  res.setHeader('Access-Control-Allow-Methods', '*')
  return next()
}
const optionsRoute = (req: any, res: any, next: any) => {
  LOGGER.debug('optionsRoute')
  res.send(200)
  return next()
}

const server = express()

server.options('*', corsHandler, optionsRoute)
server.get('*', corsHandler)
server.post('*', corsHandler)
server.put('*', corsHandler)
server.patch('*', corsHandler)
server.delete('*', corsHandler)

// Users
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
