import SCHEMAS from '../../database/schemas'
import { defaultPost, defaultGet, defaultPut, defaultDelete } from '../servlet-base'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('rest-memberships')

export const postMembership = function(req, res, next) {
    LOGGER.debug('POST ' + req.url)
    defaultPost(SCHEMAS.MEMBERSHIPS, req, res, next, null)
}
export const getMembership = function(req, res, next) {
    LOGGER.debug('GET ' + req.url)
    defaultGet(SCHEMAS.MEMBERSHIPS, req, res, next, null)
}
export const putMembership = function(req, res, next) {
    LOGGER.debug('PUT ' + req.url)
    defaultPut(SCHEMAS.MEMBERSHIPS, req, res, next, null)
}
export const deleteMembership = function(req, res, next) {
    LOGGER.debug('DELETE ' + req.url)
    defaultDelete(SCHEMAS.MEMBERSHIPS, req, res, next, null)
}