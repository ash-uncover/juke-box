import * as Types from '../../types'

export const ActionsTypes = {
  SESSION_CONNECT_SUCCESS: '@@SESSION/CONNECT_SUCCESS',
  SESSION_CHECK_FETCH: '@@SESSION/CHECK_FETCH',
  SESSION_CHECK_SUCCESS: '@@SESSION/CHECK_SUCCESS',
  SESSION_CLOSE_SUCCESS: '@@SESSION/CLOSE_SUCCESS',

  AUTH_GET_SUCCESS: '@@AUTH/GET_SUCCESS',
  AUTH_DELETE_SUCCESS: '@@AUTH/DELETE_SUCCESS',
}

export const Actions = {
  sessionConnectSuccess: (session: Types.SessionModel) => ({
    type: ActionsTypes.SESSION_CONNECT_SUCCESS,
    payload: { session, },
  }),

  sessionCheckFetch: (session: Types.SessionModel) => ({
    type: ActionsTypes.SESSION_CHECK_FETCH,
    payload: { session, },
  }),

  sessionCheckSuccess: (session: Types.SessionModel) => ({
    type: ActionsTypes.SESSION_CHECK_SUCCESS,
    payload: { session, },
  }),

  sessionCloseSuccess: (session: Types.SessionModel) => ({
    type: ActionsTypes.SESSION_CLOSE_SUCCESS,
    payload: { session, },
  }),

  authDeleteSuccess: (session: Types.SessionModel, user: Types.UserModel) => ({
    type: ActionsTypes.AUTH_DELETE_SUCCESS,
    payload: { session, user },
  }),
}
