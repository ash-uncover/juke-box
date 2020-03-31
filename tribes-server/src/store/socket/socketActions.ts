import * as Types from '../../types'

export const ActionsTypes = {
  SOCKET_CONNECT_SUCCESS: '@@SOCKET/CONNECT_SUCCESS',

  SOCKET_CHECK_FETCH: '@@SOCKET/CHECK_FETCH',
  SOCKET_CHECK_SUCCESS: '@@SOCKET/CHECK_SUCCESS',

  SOCKET_CLOSE_SUCCESS: '@@SOCKET/CLOSE_SUCCESS',
}

export const Actions = {
  socketConnectSuccess: (session: Types.SessionModel) => ({
    type: ActionsTypes.SOCKET_CONNECT_SUCCESS,
    payload: { session, },
  }),

  socketCheckFetch: (session: Types.SessionModel) => ({
    type: ActionsTypes.SOCKET_CHECK_FETCH,
    payload: { session, },
  }),

  socketCheckSuccess: (session: Types.SessionModel) => ({
    type: ActionsTypes.SOCKET_CHECK_SUCCESS,
    payload: { session, },
  }),

  socketCloseSuccess: (session: Types.SessionModel) => ({
    type: ActionsTypes.SOCKET_CLOSE_SUCCESS,
    payload: { session, },
  }),
}
