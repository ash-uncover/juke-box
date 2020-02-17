import store from '../store'
import { Actions as AuthActions } from '../store/auth/actions'
import { Actions as RestTribesActions } from '../store/rest/tribes/actions'
import { Actions as RestUsersActions } from '../store/rest/users/actions'

import {
  ErrorData,
  MembershipData,
  MembershipPostData,
  MembershipPatchData,
  TribeData,
  TribePostData,
  TribePatchData,
  UserData,
  UserPostData,
  UserPatchData
} from '../types'

import request from 'request'
import { delayedPromise } from '../utils/PromiseUtils'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('RestService')

const RestService = {

  auth: {
    get: (dispatch: any, username: string, password: string) => {
      dispatch(AuthActions.authGetFetch(username, password))
      delayedPromise(_request({ url: `/auth` }))
        .then((result: UserData) => {
          dispatch(AuthActions.authGetSuccess(result))
        })
        .catch((error: ErrorData) => {
          dispatch(AuthActions.authGetFailure(error))
        })
    },

    delete: (dispatch: any) => {
      dispatch(AuthActions.authDeleteFetch())
      setTimeout(() => {
        dispatch(AuthActions.authDeleteSuccess())
      }, 500)
    }
  },

  rest: {
    tribes: {
      get: (dispatch: any, id: string) => {
        dispatch(RestTribesActions.restTribesGetFetch(id))
        delayedPromise(_request({ url: `/rest/tribes/${id}` }))
          .then((result: TribeData) => {
            dispatch(RestTribesActions.restTribesGetSuccess(id, result))
          })
          .catch((error: ErrorData) => {
            RestTribesActions.restTribesGetFailure(id, error)
          })
      },
      post: (dispatch: any, tribe: TribePostData) => {},
      put: (dispatch: any, tribe: TribeData) => {},
      patch: (dispatch: any, tribe: TribePatchData) => {},
      delete: (dispatch: any, id: string) => {},

      memberships: {
        getAll: (dispatch: any, id: string) => {
          dispatch(RestTribesActions.restTribesMembershipsGetAllFetch(id))
          delayedPromise(_request({ url: `/rest/tribes/${id}/memberships` }))
            .then((result: Array<MembershipData>) => {
              dispatch(RestTribesActions.restTribesMembershipsGetAllSuccess(id, result))
            })
            .catch((error: ErrorData) => {
              RestTribesActions.restTribesMembershipsGetAllFailure(id, error)
            })
        }
      }
    },

    users: {
      get: (dispatch: any, id: string) => {
        dispatch(RestUsersActions.restUsersGetFetch(id))
        delayedPromise(_request({ url: `/rest/users/${id}` }))
          .then((result: UserData) => {
            dispatch(RestUsersActions.restUsersGetSuccess(id, result))
          })
          .catch((error: ErrorData) => {
            RestUsersActions.restUsersGetFailure(id, error)
          })
      },
      put: (dispatch: any, user: UserData) => {},
      patch: (dispatch: any, user: UserPatchData) => {},

      memberships: {
        getAll: (dispatch: any, id: string) => {
          dispatch(RestUsersActions.restUsersMembershipsGetAllFetch(id))
          delayedPromise(_request({ url: `/rest/users/${id}/memberships` }))
            .then((result: Array<MembershipData>) => {
              dispatch(RestUsersActions.restUsersMembershipsGetAllSuccess(id, result))
            })
            .catch((error: ErrorData) => {
              RestUsersActions.restUsersMembershipsGetAllFailure(id, error)
            })
        }
      }
    },

    memberships: {
      get: (dispatch: any, id: string) => {},
      post: (dispatch: any, membership: MembershipPostData) => {},
      put: (dispatch: any, membership: MembershipData) => {},
      patch: (dispatch: any, membership: MembershipPatchData) => {},
      delete: (dispatch: any, id: string) => {}
    }
  }
}

const URL_BASE = 'http://localhost:3090'

const _request = (reqParam: any) => {
  return new Promise((resolve, reject) => {

    const params = Object.assign(
      { method: 'GET' },
      reqParam,
      { url: `${URL_BASE}${reqParam.url}` }
    )

    const auth = store.getState().auth

    params.auth = {
      'user': auth.authUsername,
      'pass': auth.authPassword,
      'sendImmediately': true
    }

    LOGGER.debug('request')
    LOGGER.debug(JSON.stringify(params))

    request(params, (error: any, response: any, body: any) => {
      if (!error && response.statusCode >= 200 && response.statusCode < 300) {
        try {
          resolve(JSON.parse(body))
        } catch (err) {
          resolve(body)
        }
      } else {
        if (error) {
          reject(error)
        } else {
          try {
            reject(JSON.parse(body))
          } catch (err) {
            reject(body)
          }
        }
      }
    })
  })
}

export default RestService