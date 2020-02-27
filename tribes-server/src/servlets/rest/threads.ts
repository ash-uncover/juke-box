import SCHEMAS from '../../database/schemas'

import {
  defaultPost,
  defaultGet,
  defaultPut,
  defaultDelete,
  defaultGetDeep,
} from '../servlet-base'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('rest-threads')

export const postThread = function(req, res, next) {
  LOGGER.debug('POST ' + req.url)
  defaultPost(SCHEMAS.THREADS, req, res, next, null)
}

export const getThread = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  defaultGet(SCHEMAS.THREADS, req, res, next, null)
}

export const putThread = function(req, res, next) {
  LOGGER.debug('PUT ' + req.url)
  defaultPut(SCHEMAS.THREADS, req, res, next, null)
}

export const patchThread = function(req, res, next) {
  LOGGER.debug('PATCH ' + req.url)
  defaultPut(SCHEMAS.THREADS, req, res, next, null)
}

export const deleteThread = function(req, res, next) {
  LOGGER.debug('DELETE ' + req.url)
  defaultDelete(SCHEMAS.THREADS, req, res, next, null)
}

export const getThreadMessages = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  try {
    defaultGetDeep(SCHEMAS.MESSAGES, req, res, next, null)
  } catch (error) {
    res.send(500, error)
  }
}

const addRoutes = (app) => {
  app.post('/rest/threads/', postThread)
  app.get('/rest/threads/:threadId', getThread)
  app.put('/rest/threads/:threadId', putThread)
  app.patch('/rest/threads/:threadId', patchThread)
  app.delete('/rest/threads/:threadId', deleteThread)

  app.get('/rest/threads/:threadId/messages', getThreadMessages)
}
export default addRoutes
