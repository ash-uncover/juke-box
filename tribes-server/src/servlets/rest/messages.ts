import SCHEMAS from '../../database/schemas'

import {
  defaultPost,
  defaultGet,
  defaultPut,
  defaultPatch,
  defaultDelete,
} from '../servlet-base'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('rest-messages')

export const postMessage = function(req, res, next) {
  LOGGER.debug('POST ' + req.url)
  defaultPost(SCHEMAS.MESSAGES, req, res, next, null)
}

export const getMessage = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  defaultGet(SCHEMAS.MESSAGES, req, res, next, null)
}

export const putMessage = function(req, res, next) {
  LOGGER.debug('PUT ' + req.url)
  defaultPut(SCHEMAS.MESSAGES, req, res, next, null)
}

export const patchMessage = function(req, res, next) {
  LOGGER.debug('PATCH ' + req.url)
  defaultPatch(SCHEMAS.MESSAGES, req, res, next, null)
}

export const deleteMessage = function(req, res, next) {
  LOGGER.debug('DELETE ' + req.url)
  defaultDelete(SCHEMAS.MESSAGES, req, res, next, null)
}

const addRoutes = (app) => {
  app.post('/rest/messages/', postMessage)
  app.get('/rest/messages/:messageId', getMessage)
  app.put('/rest/messages/:messageId', putMessage)
  app.patch('/rest/messages/:messageId', patchMessage)
  app.delete('/rest/messages/:messageId', deleteMessage)
}
export default addRoutes