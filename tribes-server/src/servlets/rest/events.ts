import SCHEMAS from '../../database/schemas'

import {
  defaultGetAll,
  defaultPost,
  defaultGet,
  defaultPut,
  defaultDelete,
} from '../servlet-base'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('rest-events')

export const getEvents = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  defaultGetAll(SCHEMAS.EVENTS, req, res, next)
}

export const postEvent = function(req, res, next) {
  LOGGER.debug('POST ' + req.url)
  defaultPost(SCHEMAS.EVENTS, req, res, next, null)
}

export const getEvent = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  defaultGet(SCHEMAS.EVENTS, req, res, next, null)
}

export const putEvent = function(req, res, next) {
  LOGGER.debug('PUT ' + req.url)
  defaultPut(SCHEMAS.EVENTS, req, res, next, null)
}

export const patchEvent = function(req, res, next) {
  LOGGER.debug('PATCH ' + req.url)
  defaultPut(SCHEMAS.EVENTS, req, res, next, null)
}

export const deleteEvent = function(req, res, next) {
  LOGGER.debug('DELETE ' + req.url)
  defaultDelete(SCHEMAS.EVENTS, req, res, next, null)
}

const addRoutes = (app) => {
  app.post('/rest/events/', postEvent)
  app.get('/rest/events/:eventId', getEvent)
  app.put('/rest/events/:eventId', putEvent)
  app.patch('/rest/events/:eventId', patchEvent)
  app.delete('/rest/events/:eventId', deleteEvent)
}
export default addRoutes
