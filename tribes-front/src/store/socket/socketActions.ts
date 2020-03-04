import { action } from 'typesafe-actions'

export const ActionsTypes = {
  SOCKET_CONNECT_FETCH: '@@SOCKET/CONNECT_FETCH',
  SOCKET_CONNECT_SUCCESS: '@@SOCKET/CONNECT_SUCCESS',
  SOCKET_CONNECT_FAILURE: '@@SOCKET/CONNECT_FAILURE',

  SOCKET_CONNECTION_CHECK: '@@SOCKET/CONNECTION_CHECK',
  SOCKET_CONNECTION_LOST: '@@SOCKET/CONNECTION_LOST',

  SERVER_USER_CONNECTED: '@@SERVER/USER_CONNECTED',
  SERVER_USER_DISCONNECTED: '@@SERVER/USER_DISCONNECTED',

  SERVER_THREAD_MESSAGE_POSTED: '@@SERVER/THREAD/MESSAGE_POSTED',
  SERVER_THREAD_MESSAGE_DELETED: '@@SERVER/THREAD/MESSAGE_DELETED',
}

export const Actions = {
  socketConnectFetch: () => action(ActionsTypes.SOCKET_CONNECT_FETCH),
  socketConnectSuccess: () => action(ActionsTypes.SOCKET_CONNECT_SUCCESS),
  socketConnectFailure: () => action(ActionsTypes.SOCKET_CONNECT_FAILURE),

  socketConnectionCheck: () => action(ActionsTypes.SOCKET_CONNECTION_CHECK),
  socketConnectionLost: () => action(ActionsTypes.SOCKET_CONNECTION_LOST),

  serverUserConnected: () => action(ActionsTypes.SERVER_USER_CONNECTED),
  serverUserDisconnected: () => action(ActionsTypes.SERVER_USER_DISCONNECTED),
}