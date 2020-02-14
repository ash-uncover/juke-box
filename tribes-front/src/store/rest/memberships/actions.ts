import { action } from 'typesafe-actions'
import { TribeData, UserData } from '../../../types'

export const ActionsTypes = {
  REST_TRIBES_GETALL_FETCH: '@@REST/TRIBES/GETALL_FETCH',
  REST_TRIBES_GETALL_SUCCESS: '@@REST/TRIBES/GETALL_SUCCESS',
  REST_TRIBES_GETALL_FAILURE: '@@REST/TRIBES/GETALL_FAILURE',

  REST_TRIBES_GET_FETCH: '@@REST/TRIBES/GET_FETCH',
  REST_TRIBES_GET_SUCCESS: '@@REST/TRIBES/GET_SUCCESS',
  REST_TRIBES_GET_FAILURE: '@@REST/TRIBES/GET_FAILURE',

  REST_TRIBES_POST_FETCH: '@@REST/TRIBES/POST_FETCH',
  REST_TRIBES_POST_SUCCESS: '@@REST/TRIBES/POST_SUCCESS',
  REST_TRIBES_POST_FAILURE: '@@REST/TRIBES/POST_FAILURE',

  REST_TRIBES_PUT_FETCH: '@@REST/TRIBES/PUT_FETCH',
  REST_TRIBES_PUT_SUCCESS: '@@REST/TRIBES/PUT_SUCCESS',
  REST_TRIBES_PUT_FAILURE: '@@REST/TRIBES/PUT_FAILURE',

  REST_TRIBES_PATCH_FETCH: '@@REST/TRIBES/PATCH_FETCH',
  REST_TRIBES_PATCH_SUCCESS: '@@REST/TRIBES/PATCH_SUCCESS',
  REST_TRIBES_PATCH_FAILURE: '@@REST/TRIBES/PATCH_FAILURE',

  REST_TRIBES_DELETE_FETCH: '@@REST/TRIBES/DELETE_FETCH',
  REST_TRIBES_DELETE_SUCCESS: '@@REST/TRIBES/DELETE_SUCCESS',
  REST_TRIBES_DELETE_FAILURE: '@@REST/TRIBES/DELETE_FAILURE',

  REST_TRIBES_USERS_GETALL_FETCH: '@@REST/TRIBES/USERS/GETALL_FETCH',
  REST_TRIBES_USERS_GETALL_SUCCESS: '@@REST/TRIBES/USERS/GETALL_SUCCESS',
  REST_TRIBES_USERS_GETALL_FAILURE: '@@REST/TRIBES/USERS/GETALL_FAILURE'
}

export const Actions = {
  restTribesGetAllFetch: (token: string) => action(ActionsTypes.REST_TRIBES_GETALL_FETCH, { token }),
  restTribesGetAllSuccess: (tribes: Array<TribeData>) => action(ActionsTypes.REST_TRIBES_GETALL_SUCCESS, { tribes }),
  restTribesGetAllFailure: (error: string) => action(ActionsTypes.REST_TRIBES_GETALL_FAILURE, { error }),

  restTribesGetFetch: (token: string, id: string) => action(ActionsTypes.REST_TRIBES_GET_FETCH, { token, id }),
  restTribesGetSuccess: (tribe: TribeData) => action(ActionsTypes.REST_TRIBES_GET_SUCCESS, { tribe }),
  restTribesGetFailure: (error: string) => action(ActionsTypes.REST_TRIBES_GET_FAILURE, { error }),

  restTribesPostFetch: (token: string, tribe: TribeData) => action(ActionsTypes.REST_TRIBES_POST_FETCH, { token, tribe }),
  restTribesPostSuccess: (tribe: TribeData) => action(ActionsTypes.REST_TRIBES_POST_SUCCESS, { tribe }),
  restTribesPostFailure: (error: string) => action(ActionsTypes.REST_TRIBES_POST_FAILURE, { error }),

  restTribesPutFetch: (token: string, tribe: TribeData) => action(ActionsTypes.REST_TRIBES_PUT_FETCH, { token, tribe }),
  restTribesPutSuccess: (tribe: string) => action(ActionsTypes.REST_TRIBES_PUT_SUCCESS, { tribe }),
  restTribesPutFailure: (error: string) => action(ActionsTypes.REST_TRIBES_PUT_FAILURE, { error }),

  restTribesPatchFetch: (token: string, tribe: TribeData) => action(ActionsTypes.REST_TRIBES_PATCH_FETCH, { token, tribe }),
  restTribesPatchSuccess: (tribe: string) => action(ActionsTypes.REST_TRIBES_PATCH_SUCCESS, { tribe }),
  restTribesPatchFailure: (error: string) => action(ActionsTypes.REST_TRIBES_PATCH_FAILURE, { error }),

  restTribesDeleteFetch: (token: string, id: string) => action(ActionsTypes.REST_TRIBES_DELETE_FETCH, { token, id }),
  restTribesDeleteSuccess: () => action(ActionsTypes.REST_TRIBES_DELETE_SUCCESS, {}),
  restTribesDeleteFailure: (error: string) => action(ActionsTypes.REST_TRIBES_DELETE_FAILURE, { error }),

  restTribesUsersGetAllFetch: (token: string, id: string) => action(ActionsTypes.REST_TRIBES_USERS_GETALL_FETCH, { token, id }),
  restTribesUsersGetAllSuccess: (users: Array<UserData>) => action(ActionsTypes.REST_TRIBES_USERS_GETALL_SUCCESS, { users }),
  restTribesUsersGetAllFailure: (error: string) => action(ActionsTypes.REST_TRIBES_USERS_GETALL_FAILURE, { error })
}