import { Actions as AuthActions } from '../store/auth/actions'
import { Actions as RestTribesActions } from '../store/rest/tribes/actions'
import {
  TribeData,
  UserData
} from '../types'

const RestService = {

  auth: {
    get: (dispatch: any, username: string, password: string) => {
      dispatch(AuthActions.authGetFetch(username, password))
      setTimeout(() => {
        if (username === 'a' && password === 'a') {
          dispatch(AuthActions.authGetSuccess('tokenOk'))
        } else {
          dispatch(AuthActions.authGetFailure('errorAuth'))
        }
      }, 1000)
    },

    delete: (dispatch: any, token: string) => {
      dispatch(AuthActions.authDeleteFetch(token))
      setTimeout(() => {
        dispatch(AuthActions.authDeleteSuccess())
      }, 1000)
    }
  },

  rest: {
    tribes: {
      getAll: (dispatch: any, token: string) => {
        dispatch(RestTribesActions.restTribesGetAllFetch(token))
        setTimeout(() => {
          dispatch(RestTribesActions.restTribesGetAllSuccess([]))
        }, 1000)
      },
      get: (dispatch: any, token: string, id: string) => {},
      post: (dispatch: any, token: string, tribe: TribeData) => {},
      put: (dispatch: any, token: string, tribe: TribeData) => {},
      patch: (dispatch: any, token: string, tribe: TribeData) => {},
      delete: (dispatch: any, token: string, id: string) => {},

      users: {
        getAll: (dispatch: any, token: string, id: string) => {}
      }
    },

    users: {
      getAll: (dispatch: any, token: string) => {},
      get: (dispatch: any, token: string, id: string) => {},
      post: (dispatch: any, token: string, user: UserData) => {},
      put: (dispatch: any, token: string, user: UserData) => {},
      patch: (dispatch: any, token: string, user: UserData) => {},
      delete: (dispatch: any, token: string, id: string) => {},

      tribes: {
        getAll: (dispatch: any, token: string, id: string) => {}
      }
    }
  }
}

export default RestService