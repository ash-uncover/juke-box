import SCHEMAS from '../../database/schemas'

import ERRORS, {
  sendError
} from '../servlet-error'

import {
  defaultGetAll,
  defaultPost,
  defaultGet,
  defaultPut,
  defaultPatch,
  defaultDelete,
  defaultGetDeep
} from '../servlet-base'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('rest-users')

export const getUsers = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  defaultGetAll(SCHEMAS.USERS, req, res, next)
}

export const postUser = function(req, res, next) {
  LOGGER.debug('POST ' + req.url)
  LOGGER.debug(JSON.stringify(req.body))
  try {
    defaultPost(SCHEMAS.USERS, req, res, next, (error) => {
      if (error && error.code === 11000) {
        if (error.message.indexOf('username') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_USERNAME_INUSE)
        } else if (error.message.indexOf('email') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_EMAIL_INUSE)
        }
      } else if (error && error.name === 'ValidationError') {
        sendError(LOGGER, res, {
          status: 400,
          error: error.message
        })
      } else {
        res.send(500, error)
      }
    })
  } catch (error) {
    res.send(500, error)
  }
}

export const getUser = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  try {
    defaultGet(SCHEMAS.USERS, req, res, next, null)
  } catch (error) {
    res.send(500, error)
  }
}

export const putUser = function(req, res, next) {
  LOGGER.debug('PUT ' + req.url)
  LOGGER.debug(JSON.stringify(req.body))
  try {
    defaultPut(SCHEMAS.USERS, req, res, next, (error) => {
      if (error && error.code === 11000) {
        if (error.message.indexOf('username') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_USERNAME_INUSE)
        } else if (error.message.indexOf('email') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_EMAIL_INUSE)
        }
      } else if (error && error.name === 'ValidationError') {
        sendError(LOGGER, res, {
          status: 400,
          error: error.message
        })
      } else {
        res.send(500, error)
      }
    })
  } catch (error) {
    res.send(500, error)
  }
}

export const patchUser = function(req, res, next) {
  LOGGER.debug('PATCH ' + req.url)
  LOGGER.debug(JSON.stringify(req.body))
  try {
    defaultPatch(SCHEMAS.USERS, req, res, next, (error) => {
      if (error && error.code === 11000) {
        if (error.message.indexOf('username') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_USERNAME_INUSE)
        } else if (error.message.indexOf('email') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_EMAIL_INUSE)
        }
      } else if (error && error.name === 'ValidationError') {
        sendError(LOGGER, res, {
          status: 400,
          error: error.message
        })
      } else {
        res.send(500, error)
      }
    })
  } catch (error) {
    res.send(500, error)
  }
}

export const deleteUser = function(req, res, next) {
  LOGGER.debug('DELETE ' + req.url)
  try {
    defaultDelete(SCHEMAS.USERS, req, res, next, null)
  } catch (error) {
    res.send(500, error)
  }
}

export const getUserMemberships = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  try {
    defaultGetDeep(SCHEMAS.MEMBERSHIPS, req, res, next, null)
  } catch (error) {
    res.send(500, error)
  }
}