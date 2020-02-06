import SCHEMAS from '../../database/schemas'
import { defaultGetAll, defaultPost, defaultGet, defaultPut, defaultDelete, defaultGetDeep } from '../servlet-base'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('rest-tribes')

export const getTribes = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  defaultGetAll(SCHEMAS.TRIBES, req, res, next)
}

export const postTribe = function(req, res, next) {
  LOGGER.debug('POST ' + req.url)
  defaultPost(SCHEMAS.TRIBES, req, res, next, null)
}

export const getTribe = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  defaultGet(SCHEMAS.TRIBES, req, res, next, null)
}

export const putTribe = function(req, res, next) {
  LOGGER.debug('PUT ' + req.url)
  defaultPut(SCHEMAS.TRIBES, req, res, next, null)
}

export const patchTribe = function(req, res, next) {
  LOGGER.debug('PATCH ' + req.url)
  defaultPut(SCHEMAS.TRIBES, req, res, next, null)
}

export const deleteTribe = function(req, res, next) {
  LOGGER.debug('DELETE ' + req.url)
  defaultDelete(SCHEMAS.TRIBES, req, res, next, null)
}

export const getTribeMemberships = function(req, res, next) {
  LOGGER.debug('GET ' + req.url)
  LOGGER.debug(JSON.stringify(req.param))
  defaultGetDeep(SCHEMAS.MEMBERSHIPS, req, res, next, null)
}
