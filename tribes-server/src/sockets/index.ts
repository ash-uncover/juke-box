import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

import store from '../store'
import * as StoreUtils from '../utils/StoreUtils'

import {
  Actions as Actions,
  ActionsTypes as ActionsTypes
} from '../store/sessions/sessionsActions'

import {
  Actions as UsersActions,
  UsersActionsTypes as UsersActionsTypes
} from '../store/data/users/usersActions'

import {
  Actions as ThreadsActions,
  ActionsTypes as ThreadsActionsTypes
} from '../store/data/threads/threadsActions'

import {
  Actions as MessagesActions,
  ActionsTypes as MessagesActionsTypes
} from '../store/data/messages/messagesActions'

import SCHEMAS from '../database/schemas'

import {
  SessionModel
} from '../types'

import {
  UUID,
} from '../utils'

import {
  dateString,
  nowString,
} from '../utils/DateUtils'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('SERVER - SOCKET')

interface ExtWebSocket extends WebSocket {
  isAlive: boolean
}

const PING_INTERVAL = 10000

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const send = (ws, type = '@@UNKNOWN', payload = {}) => {
  LOGGER.debug(`${ws['_id'].substring(0, 4)} - ${nowString()} - ${ws['_userId']} - TO - ${type}`)
  ws.send(JSON.stringify({ type, payload }))
}

const received = (session: SessionModel, message: string) => {
  try {
    const action = JSON.parse(message)
    Object.assign(action, { session })
    LOGGER.debug(`${session.id} - ${nowString()} - ${session.userId} - FROM - ${action.type}`)
    return action
  } catch (error) {
    LOGGER.error(`Failed to parse: ${message}`)
    return {}
  }
}

wss.on('connection', (ws: ExtWebSocket) => {
  const sessionId = `#${UUID.next()}`
  ws['_id'] = sessionId

  store.dispatch(
    Actions.sessionConnectSuccess(
      { id: sessionId }
    )
  )

  ws.on('close', (message: string) => {
    const session = store.getState().sessions[sessionId]
    if (session.userId) {
      store.dispatch(
        Actions.authDeleteSuccess(
          session,
          { id: session.userId }
        )
      )
    }
    store.dispatch(
      Actions.sessionCloseSuccess(
        session
      )
    )
  })

  ws.on('message', (message: string) => {
    const session = store.getState().sessions[sessionId]
    const { userId } = session
    const action = received(session, message)
    store.dispatch(action)

    switch (action.type) {

      // Authentication (user online)

      case ActionsTypes.AUTH_GET_SUCCESS: {
        LOGGER.warn(`${sessionId} - ${session.userId} - CONNECT`)
        const listeners = store.getState().data.users[userId]
        const sessions = store.getState().sessions

        send(ws, '@@SERVER/USER_CONNECTED', { id: userId })

        wss.clients.forEach((client) => {
          const session = sessions[client['_id']]
          if (session.id !== sessionId && listeners.includes(session.userId)) {
            send(client, '@@SERVER/USER_CONNECTED', { id: userId })
          }
        })
        break
      }

      // Messages

      case MessagesActionsTypes.REST_MESSAGES_POST_SUCCESS: {
        const threadId = action.payload.message.threadId
        const listeners = store.getState().data.threads[threadId]
        const sessions = store.getState().sessions

        wss.clients.forEach((client) => {
          const session = sessions[client['_id']]
          if (session.id !== sessionId && listeners.includes(session.userId)) {
            send(client, '@@SERVER/THREAD/MESSAGE_POSTED', { threadId })
          }
        })
        break
      }

      case MessagesActionsTypes.REST_MESSAGES_PATCH_SUCCESS: {
        const messageId = action.payload.message.id
        const listeners = store.getState().data.messages[messageId]
        const sessions = store.getState().sessions

        wss.clients.forEach((client) => {
          const session = sessions[client['_id']]
          if (session.id !== sessionId && listeners.includes(session.userId)) {
            send(
              client,
              MessagesActionsTypes.REST_MESSAGES_PATCH_SUCCESS,
              action.payload,
            )
          }
        })
        break
      }

      case '@@REST/MESSAGES/DELETE_SUCCESS': {
        const messageId = action.payload.message.id
        const listeners = store.getState().data.messages[messageId]
        const sessions = store.getState().sessions

        wss.clients.forEach((client) => {
          const session = sessions[client['_id']]
          if (session.id !== sessionId && listeners.includes(session.userId)) {
            send(
              client,
              '@@SERVER/THREAD/MESSAGE_DELETED',
              action.payload,
            )
          }
        })
        break
      }
    }

  })

  LOGGER.info('Connected to WS server ' + sessionId)
})

setInterval(() => {
  LOGGER.info('-------------- INTERVAL ----------------------')
  wss.clients.forEach((ws: ExtWebSocket) => {
    if (ws.isAlive === false) {
      LOGGER.warn(`${ws['_id']} - ${ws['_userId']} - CONNECTION LOST`)
      return ws.terminate()
    }
    LOGGER.warn(`${ws['_id']} - ${ws['_userId']} - STILL ALIVE`)
    ws.isAlive = false
    send(ws, '@@SOCKET/CONNECTION_CHECK')
  })
}, PING_INTERVAL)

export default server
