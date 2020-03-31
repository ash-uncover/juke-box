import * as Types from '../../types'

export const ActionsTypes = {
  AUTH_GET_SUCCESS: '@@AUTH/GET_SUCCESS',
  AUTH_DELETE_SUCCESS: '@@AUTH/DELETE_SUCCESS',
  REST_USERS_GET_SUCCESS: '@@REST/USERS/GET_SUCCESS',
  REST_MESSAGES_POST_SUCCESS: '@@REST/MESSAGES/POST_SUCCESS',
  REST_MESSAGES_PATCH_SUCCESS: '@@REST/MESSAGES/PATCH_SUCCESS'
}

export const Actions = {

  authGetSuccess: (
    session: Types.SessionModel,
    user: Types.UserModel,
  ) => ({
    type: ActionsTypes.AUTH_GET_SUCCESS,
    payload: {
      session,
      user,
    },
  }),

  authDeleteSuccess: (
    session: Types.SessionModel,
    user: Types.UserModel,
  ) => ({
    type: ActionsTypes.AUTH_DELETE_SUCCESS,
    payload: {
      session,
      user,
    },
  }),
}
