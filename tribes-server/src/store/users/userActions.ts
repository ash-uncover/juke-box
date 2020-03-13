import * as Types from '../../types'

export const ActionsTypes = {
  AUTH_GET_SUCCESS: '@@AUTH/GET_SUCCESS',
  AUTH_DELETE_SUCCESS: '@@AUTH/DELETE_SUCCESS',
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
