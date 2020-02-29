import store from '../store'

import { Actions as AuthActions } from '../store/auth/authActions'
import { Actions as RestMessagesActions } from '../store/rest/messages/messagesActions'
import { Actions as RestThreadsActions } from '../store/rest/threads/threadsActions'
import { Actions as RestTribesActions } from '../store/rest/tribes/tribesActions'
import { Actions as RestUsersActions } from '../store/rest/users/usersActions'

import {
  ErrorData,
  FriendshipData,
  FriendshipPostData,
  FriendshipPatchData,
  MessageData,
  MessagePostData,
  MessagePatchData,
  MembershipData,
  MembershipPostData,
  MembershipPatchData,
  ThreadData,
  ThreadPostData,
  ThreadPatchData,
  TribeData,
  TribePostData,
  TribePatchData,
  UserData,
  UserPostData,
  UserPatchData,
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
    },
  },

  rest: {
    messages: {
      get: (dispatch: any, id: string) => {
        dispatch(RestMessagesActions.restMessagesGetFetch(id))
        delayedPromise(_request({ url: `/rest/messages/${id}` }))
          .then((result: MessageData) => {
            dispatch(RestMessagesActions.restMessagesGetSuccess(id, result))
          })
          .catch((error: ErrorData) => {
            dispatch(RestMessagesActions.restMessagesGetFailure(id, error))
          })
      },
      post: (dispatch: any, message: MessagePostData) => {
        dispatch(RestMessagesActions.restMessagesPostFetch(message.threadId))
        return delayedPromise(_request({ url: `/rest/messages`, method: 'POST', body: message }))
          .then((result: MessageData) => {
            dispatch(RestMessagesActions.restMessagesPostSuccess(result))
          })
          .catch((error: ErrorData) => {
            dispatch(RestMessagesActions.restMessagesPostFailure(error))
          })
      },
      put: (dispatch: any, membership: MembershipData) => {},
      patch: (dispatch: any, membership: MembershipPatchData) => {},
      delete: (dispatch: any, id: string) => {},
    },

    memberships: {
      get: (dispatch: any, id: string) => {},
      post: (dispatch: any, membership: MembershipPostData) => {},
      put: (dispatch: any, membership: MembershipData) => {},
      patch: (dispatch: any, membership: MembershipPatchData) => {},
      delete: (dispatch: any, id: string) => {},
    },

    friendships: {
      get: (dispatch: any, id: string) => {},
      post: (dispatch: any, friendship: FriendshipPostData) => {},
      put: (dispatch: any, friendship: FriendshipData) => {},
      patch: (dispatch: any, friendship: FriendshipPatchData) => {},
      delete: (dispatch: any, id: string) => {},
    },

    threads: {
      get: (dispatch: any, id: string) => {
        dispatch(RestThreadsActions.restThreadsGetFetch(id))
        delayedPromise(_request({ url: `/rest/threads/${id}` }))
          .then((result: ThreadData) => {
            dispatch(RestThreadsActions.restThreadsGetSuccess(id, result))
          })
          .catch((error: ErrorData) => {
            dispatch(RestThreadsActions.restThreadsGetFailure(id, error))
          })
      },
      post: (dispatch: any, friendship: FriendshipPostData) => {},
      put: (dispatch: any, friendship: FriendshipData) => {},
      patch: (dispatch: any, friendship: FriendshipPatchData) => {},
      delete: (dispatch: any, id: string) => {},

      messages: {
        getAll: (dispatch: any, id: string) => {
          dispatch(RestThreadsActions.restThreadsMessagesGetAllFetch(id))
          delayedPromise(_request({ url: `/rest/threads/${id}/messages` }))
            .then((result: Array<MessageData>) => {
              dispatch(RestThreadsActions.restThreadsMessagesGetAllSuccess(id, result))
            })
            .catch((error: ErrorData) => {
              dispatch(RestThreadsActions.restThreadsMessagesGetAllFailure(id, error))
            })
        },
      }
    },

    tribes: {
      get: (dispatch: any, id: string) => {
        dispatch(RestTribesActions.restTribesGetFetch(id))
        delayedPromise(_request({ url: `/rest/tribes/${id}` }))
          .then((result: TribeData) => {
            dispatch(RestTribesActions.restTribesGetSuccess(id, result))
          })
          .catch((error: ErrorData) => {
            dispatch(RestTribesActions.restTribesGetFailure(id, error))
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
              dispatch(RestTribesActions.restTribesMembershipsGetAllFailure(id, error))
            })
        },
      },
    },

    users: {
      get: (dispatch: any, id: string) => {
        dispatch(RestUsersActions.restUsersGetFetch(id))
        delayedPromise(_request({ url: `/rest/users/${id}` }))
          .then((result: UserData) => {
            dispatch(RestUsersActions.restUsersGetSuccess(id, result))
          })
          .catch((error: ErrorData) => {
            dispatch(RestUsersActions.restUsersGetFailure(id, error))
          })
      },
      put: (dispatch: any, user: UserData) => {},
      patch: (dispatch: any, user: UserPatchData) => {},

      friendships: {
        getAll: (dispatch: any, id: string) => {
          dispatch(RestUsersActions.restUsersFriendshipsGetAllFetch(id))
          delayedPromise(_request({ url: `/rest/users/${id}/friendships` }))
            .then((result: Array<FriendshipData>) => {
              dispatch(RestUsersActions.restUsersFriendshipsGetAllSuccess(id, result))
            })
            .catch((error: ErrorData) => {
              dispatch(RestUsersActions.restUsersFriendshipsGetAllFailure(id, error))
            })
        },
      },

      memberships: {
        getAll: (dispatch: any, id: string) => {
          dispatch(RestUsersActions.restUsersMembershipsGetAllFetch(id))
          delayedPromise(_request({ url: `/rest/users/${id}/memberships` }))
            .then((result: Array<MembershipData>) => {
              dispatch(RestUsersActions.restUsersMembershipsGetAllSuccess(id, result))
            })
            .catch((error: ErrorData) => {
              dispatch(RestUsersActions.restUsersMembershipsGetAllFailure(id, error))
            })
        },
      },

      threads: {
        getAll: (dispatch: any, id: string) => {
          dispatch(RestUsersActions.restUsersThreadsGetAllFetch(id))
          delayedPromise(_request({ url: `/rest/users/${id}/threads` }))
            .then((result: Array<ThreadData>) => {
              dispatch(RestUsersActions.restUsersThreadsGetAllSuccess(id, result))
            })
            .catch((error: ErrorData) => {
              dispatch(RestUsersActions.restUsersThreadsGetAllFailure(id, error))
            })
        },
      },
    },
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

    if (params.body) {
      params.json = true
    }

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