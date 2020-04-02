import { action } from 'typesafe-actions'

export const ActionsTypes = {
  SESSION_CONNECT_FETCH: '@@SESSION/CONNECT_FETCH',
  SESSION_CONNECT_SUCCESS: '@@SESSION/CONNECT_SUCCESS',
  SESSION_CONNECT_FAILURE: '@@SESSION/CONNECT_FAILURE',

  SESSION_CHECK_FETCH: '@@SESSION/CHECK_FETCH',
  SESSION_CHECK_SUCCESS: '@@SESSION/CHECK_SUCCESS',
  SESSION_CHECK_FAILURE: '@@SESSION/CHECK_FAILURE',

  SESSION_LOST: '@@SESSION/LOST',

  SERVER_USER_CONNECTED: '@@SERVER/USER_CONNECTED',
  SERVER_USER_DISCONNECTED: '@@SERVER/USER_DISCONNECTED',

  SERVER_THREAD_MESSAGE_CREATED: '@@SERVER/THREAD/MESSAGE_CREATED',
  SERVER_THREAD_MESSAGE_UPDATED: '@@SERVER/THREAD/MESSAGE_UPDATED',
  SERVER_THREAD_MESSAGE_DELETED: '@@SERVER/THREAD/MESSAGE_DELETED',
}

export const Actions = {
  sessionConnectFetch: () => action(ActionsTypes.SESSION_CONNECT_FETCH),
  sessionConnectSuccess: () => action(ActionsTypes.SESSION_CONNECT_SUCCESS),
  sessionConnectFailure: () => action(ActionsTypes.SESSION_CONNECT_FAILURE),

  sessionCheckFetch: () => action(ActionsTypes.SESSION_CHECK_FETCH),
  sessionCheckSuccess: () => action(ActionsTypes.SESSION_CHECK_SUCCESS),
  sessionCheckFailure: () => action(ActionsTypes.SESSION_CHECK_FAILURE),

  sessionLost: () => action(ActionsTypes.SESSION_LOST),

  serverUserConnected: () => action(ActionsTypes.SERVER_USER_CONNECTED),
  serverUserDisconnected: () => action(ActionsTypes.SERVER_USER_DISCONNECTED),
}