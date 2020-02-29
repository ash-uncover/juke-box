import { action } from 'typesafe-actions'

export const ActionsTypes = {
  SOCKECT_CONNECT_FETCH: '@@SOCKET/CONNECT_FETCH',
  SOCKECT_CONNECT_SUCCESS: '@@SOCKET/CONNECT_SUCCESS',
  SOCKECT_CONNECT_FAILURE: '@@SOCKET/CONNECT_FAILURE',

  SOCKECT_CONNECTION_CHECK: '@@SOCKET/CONNECTION_CHECK',
  SOCKECT_CONNECTION_LOST: '@@SOCKET/CONNECTION_LOST',

  SERVER_USER_CONNECTED: '@@SERVER/USER_CONNECTED',
  SERVER_USER_DISCONNECTED: '@@SERVER/USER_DISCONNECTED',

  SERVER_THREAD_MESSAGE_POSTED: '@@SERVER/THREAD/MESSAGE_POSTED',
}

export const Actions = {
  socketConnectFetch: () => action(ActionsTypes.SOCKECT_CONNECT_FETCH),
  socketConnectSuccess: () => action(ActionsTypes.SOCKECT_CONNECT_SUCCESS),
  socketConnectFailure: () => action(ActionsTypes.SOCKECT_CONNECT_FAILURE),

  socketConnectionCheck: () => action(ActionsTypes.SOCKECT_CONNECTION_CHECK),
  socketConnectionLost: () => action(ActionsTypes.SOCKECT_CONNECTION_LOST),

  serverUserConnected: () => action(ActionsTypes.SERVER_USER_CONNECTED),
  serverUserDisconnected: () => action(ActionsTypes.SERVER_USER_DISCONNECTED),
}