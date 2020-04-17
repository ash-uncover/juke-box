import { action } from 'typesafe-actions'

import {
  Actions as SessionsActions,
  ActionsTypes as SessionsActionsTypes
} from '../store/socket/socketActions'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('SocketService')

const CONN_TIMEOUT = 30000
const CONN_TIMEOUT_DELAY = 10000

let _socket: WebSocket
let _pingTimeout: any

const SocketService = {

  connect(dispatch: any, url: string) {
    dispatch(SessionsActions.sessionConnectFetch())

    _socket = new WebSocket(url)

    _socket.onopen = function() {
      dispatch(SessionsActions.sessionConnectSuccess())

      this.onmessage = (event: any) => {
        const actionData = JSON.parse(event.data)
        LOGGER.info(actionData)
        switch (actionData.type) {
          case SessionsActionsTypes.SESSION_CHECK_FETCH: {
            SocketService.heartbeat(dispatch)
            _socket.send(JSON.stringify({ type: SessionsActionsTypes.SESSION_CHECK_SUCCESS }))
            break
          }
          default: {
            dispatch(action(actionData.type, actionData.payload))
            break
          }
        }
      }
    }

    _socket.onerror = (error) => {
      dispatch(SessionsActions.sessionConnectFailure())
    }
  },

  heartbeat: (dispatch: any) => {
    LOGGER.info('heartbeat')
    clearTimeout(_pingTimeout)
    _pingTimeout = setTimeout(() => {
      SocketService.close(dispatch)
    }, CONN_TIMEOUT + CONN_TIMEOUT_DELAY)
  },

  send: (dispatch: any, data: any) => {
    try {
      _socket.send(JSON.stringify(data))
    } catch (error) {
      SocketService.close(dispatch)
    }
  },

  close: (dispatch: any) => {
    clearTimeout(_pingTimeout)
    _socket.close()
    dispatch(SessionsActions.sessionLost())
  }
}

export default SocketService
