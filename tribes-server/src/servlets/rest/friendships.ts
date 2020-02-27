import SCHEMAS from '../../database/schemas'

import {
  defaultPost,
  defaultGet,
  defaultPut,
  defaultDelete,
} from '../servlet-base'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('rest-friends')

export const postFriendship = function(req, res, next) {
  LOGGER.debug('POST ' + req.url)
  defaultPost(SCHEMAS.FRIENDSHIPS, req, res, next, null)
}

export const getFriendship = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  defaultGet(SCHEMAS.FRIENDSHIPS, req, res, next, null)
}

export const putFriendship = function(req, res, next) {
  LOGGER.debug('PUT ' + req.url)
  defaultPut(SCHEMAS.FRIENDSHIPS, req, res, next, null)
}

export const patchFriendship = function(req, res, next) {
  LOGGER.debug('PATCH ' + req.url)
  defaultPut(SCHEMAS.FRIENDSHIPS, req, res, next, null)
}

export const deleteFriendship = function(req, res, next) {
  LOGGER.debug('DELETE ' + req.url)
  defaultDelete(SCHEMAS.FRIENDSHIPS, req, res, next, null)
}

const addRoutes = (app) => {
  app.post('/rest/friendships/', postFriendship)
  app.get('/rest/friendships/:friendshipId', getFriendship)
  app.put('/rest/friendships/:friendshipId', putFriendship)
  app.patch('/rest/friendships/:friendshipId', patchFriendship)
  app.delete('/rest/friendships/:friendshipId', deleteFriendship)
}
export default addRoutes
