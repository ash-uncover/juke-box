import * as Types from '../../types'

export const ActionsTypes = {
  SOCKET_CONNECT_SUCCESS: '@@SOCKET/CONNECT_SUCCESS'
}

export const Actions = {
  socketConnectSuccess: (session: Types.SessionModel) => ({
    type: ActionsTypes.SOCKET_CONNECT_SUCCESS,
    payload: {
      session,
    },
  }),
}
