import { action } from 'typesafe-actions'
import { UserData } from '../../types'

export const ActionsTypes = {
  AUTH_GET_FETCH: '@@AUTH/GET_FETCH',
  AUTH_GET_SUCCESS: '@@AUTH/GET_SUCCESS',
  AUTH_GET_FAILURE: '@@AUTH/GET_FAILURE',

  AUTH_POST_FETCH: '@@AUTH/POST_FETCH',
  AUTH_POST_SUCCESS: '@@AUTH/POST_SUCCESS',
  AUTH_POST_FAILURE: '@@AUTH/POST_FAILURE',

  AUTH_DELETE_FETCH: '@@AUTH/DELETE_FETCH',
  AUTH_DELETE_SUCCESS: '@@AUTH/DELETE_SUCCESS',
  AUTH_DELETE_FAILURE: '@@AUTH/DELETE_FAILURE',

  AUTH_PASSWORD_PUT_FETCH:'@@AUTH/PASSWORD/PUT_FETCH',

  AUTH_REGISTER_POST_FETCH: '@@AUTH/REGISTER/POST_FETCH',

  AUTH_RECOVER_POST_FETCH: '@@AUTH/RECOVER/POST_FETCH',

  AUTH_RECOVER_CHECK_POST_FETCH: '@@AUTH/RECOVER/CHECK/POST_FETCH',

  AUTH_RECOVER_PUT_FETCH: '@@AUTH/RECOVER/PUT_FETCH',

  AUTH_CHANGEMAIL_POST_FETCH: '@@AUTH/CHANGEMAIL/POST_FETCH',

  AUTH_CHANGEMAIL_CHECK_POST_FETCH: '@@AUTH/CHANGEMAIL/CHECK/POST_FETCH',

  AUTH_CHANGEMAIL_PUT_FETCH: '@@AUTH/CHANGEMAIL/PUT_FETCH',

  AUTH_CHANGEMAIL_CONFIRM_POST_FETCH: '@@AUTH/CHANGEMAIL/CONFIRM/POST_FETCH'
}

export const Actions = {
  authGetFetch: (username: string, password: string) => action(ActionsTypes.AUTH_GET_FETCH, { username, password }),
  authGetSuccess: (user: UserData) => action(ActionsTypes.AUTH_GET_SUCCESS, { user }),
  authGetFailure: (error: string) => action(ActionsTypes.AUTH_GET_FAILURE, { error }),

  authPostFetch: () => action(ActionsTypes.AUTH_POST_FETCH),
  authPostSuccess: () => action(ActionsTypes.AUTH_POST_SUCCESS),
  authPostFailure: () => action(ActionsTypes.AUTH_POST_FAILURE),

  authDeleteFetch: (token: string) => action(ActionsTypes.AUTH_DELETE_FETCH, { token }),
  authDeleteSuccess: () => action(ActionsTypes.AUTH_DELETE_SUCCESS),
  authDeleteFailure: (error: string) => action(ActionsTypes.AUTH_DELETE_FAILURE, { error }),

  authPasswordPut: () => action(ActionsTypes.AUTH_PASSWORD_PUT_FETCH),
  authRegisterPost: () => action(ActionsTypes.AUTH_REGISTER_POST_FETCH),
  authRecoverPost: () => action(ActionsTypes.AUTH_RECOVER_POST_FETCH),
  authRecoverCheckPost: () => action(ActionsTypes.AUTH_RECOVER_CHECK_POST_FETCH),
  authRecoverPut: () => action(ActionsTypes.AUTH_RECOVER_PUT_FETCH),
  authChangemailPost: () => action(ActionsTypes.AUTH_CHANGEMAIL_POST_FETCH),
  authChangemailCheckPost: () => action(ActionsTypes.AUTH_CHANGEMAIL_CHECK_POST_FETCH),
  authChangemailPut: () => action(ActionsTypes.AUTH_CHANGEMAIL_PUT_FETCH),
  authChangemailConfirmPost: () => action(ActionsTypes.AUTH_CHANGEMAIL_CONFIRM_POST_FETCH)
}