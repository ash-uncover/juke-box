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

export const patchFriendship = function(req, res, next) {
  LOGGER.debug('PATCH ' + req.url)
  defaultPut(SCHEMAS.FRIENDSHIPS, req, res, next, null)
}

export const deleteFriendship = function(req, res, next) {
  LOGGER.debug('DELETE ' + req.url)
  defaultDelete(SCHEMAS.FRIENDSHIPS, req, res, next, null)
}
