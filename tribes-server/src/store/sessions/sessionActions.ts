import { action } from 'typesafe-actions'

export const ActionsTypes = {
  SOCKET_CONNECT_FETCH: '@@SOCKET/CONNECT_FETCH',
  SOCKET_CONNECT_SUCCESS: '@@SOCKET/CONNECT_SUCCESS',
  SOCKET_CONNECT_FAILURE: '@@SOCKET/CONNECT_FAILURE',
}

export const Actions = {
  socketConnectFetch: () => action(ActionsTypes.SOCKET_CONNECT_FETCH),
  socketConnectSuccess: () => action(ActionsTypes.SOCKET_CONNECT_SUCCESS),
  socketConnectFailure: () => action(ActionsTypes.SOCKET_CONNECT_FAILURE),

}