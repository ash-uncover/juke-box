import store from '../store'
import { Actions as AuthActions } from '../store/auth/actions'
import { Actions as RestTribesActions } from '../store/rest/users/actions'

import {
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
        .then((result: any) => {
          dispatch(AuthActions.authGetSuccess('Basic'))
        })
        .catch((error: any) => {
          dispatch(AuthActions.authGetFailure('errorAuth'))
        })
    },

    delete: (dispatch: any, token: string) => {
      dispatch(AuthActions.authDeleteFetch(token))
      setTimeout(() => {
        dispatch(AuthActions.authDeleteSuccess())
      }, 500)
    }
  },

  rest: {
    tribes: {
      getAll: (dispatch: any, token: string) => {
        dispatch(RestTribesActions.restTribesGetAllFetch(token))
        delayedPromise(_request({ url: `/rest/tribes` }))
          .then((result: any) => {
            dispatch(RestTribesActions.restTribesGetAllSuccess(result))
          })
          .catch((error: any) => {
            RestTribesActions.restTribesGetAllFailure(error)
          })
      },
      get: (dispatch: any, token: string, id: string) => {},
      post: (dispatch: any, token: string, tribe: TribePostData) => {},
      put: (dispatch: any, token: string, tribe: TribeData) => {},
      patch: (dispatch: any, token: string, tribe: TribePatchData) => {},
      delete: (dispatch: any, token: string, id: string) => {},

      memberships: {
        getAll: (dispatch: any, token: string, id: string) => {}
      }
    },

    users: {
      getAll: (dispatch: any, token: string) => {},
      get: (dispatch: any, token: string, id: string) => {},
      post: (dispatch: any, token: string, user: UserPostData) => {},
      put: (dispatch: any, token: string, user: UserData) => {},
      patch: (dispatch: any, token: string, user: UserPatchData) => {},
      delete: (dispatch: any, token: string, id: string) => {},

      memberships: {
        getAll: (dispatch: any, token: string, id: string) => {}
      }
    },

    memberships: {
      get: (dispatch: any, token: string, id: string) => {},
      post: (dispatch: any, token: string, membership: MembershipPostData) => {},
      put: (dispatch: any, token: string, membership: MembershipData) => {},
      patch: (dispatch: any, token: string, membership: MembershipPatchData) => {},
      delete: (dispatch: any, token: string, id: string) => {}
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
    console.log(auth)
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