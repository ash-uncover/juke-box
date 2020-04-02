import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

import store from '../store'

import {
  Actions as Actions,
  ActionsTypes as SessionsActionsTypes
} from '../store/sessions/sessionsActions'

import {
  Actions as UsersActions,
  ActionsTypes as UsersActionsTypes
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
    action.payload = Object.assign(
      action.payload || {},
      { session }
    )
    LOGGER.debug(`${session.id} - ${nowString()} - ${session.userId} - FROM - ${action.type}`)
    return action
  } catch (error) {
    LOGGER.error(`Failed to parse: ${message}`)
    LOGGER.error(error)
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

      case SessionsActionsTypes.AUTH_GET_SUCCESS: {
        const sessionUpdated = store.getState().sessions[sessionId]
        LOGGER.warn(`${sessionId} - ${sessionUpdated.userId} - CONNECT`)
        const listeners = store.getState().data.users[sessionUpdated.userId] || []
        const sessions = store.getState().sessions

        send(ws, '@@SERVER/USER_CONNECTED', { id: sessionUpdated.userId })

        wss.clients.forEach((client) => {
          const session = sessions[client['_id']]
          if (session.id !== sessionId && listeners.includes(session.userId)) {
            send(client, '@@SERVER/USER_CONNECTED', { id: sessionUpdated.userId })
          }
        })
        break
      }

      case SessionsActionsTypes.AUTH_DELETE_SUCCESS: {
        LOGGER.warn(`${sessionId} - ${userId} - DISCONNECT`)
        const listeners = store.getState().data.users[userId] || []
        const sessions = store.getState().sessions
        const userSessions = Object.values(sessions).filter((session) => session.userId === userId)

        if (userSessions.length === 0) {
          wss.clients.forEach((client) => {
            const session = sessions[client['_id']]
            if (session.id !== sessionId && listeners.includes(session.userId)) {
              send(client, '@@SERVER/USER_DISCONNECTED', { id: userId })
            }
          })
          break
        }
      }

      // Users

      case UsersActionsTypes.REST_USERS_GET_SUCCESS: {
        const userId = action.payload.user.id

        const sessions = store.getState().sessions
        const isOnline = Object.values(sessions).some((session) => session.userId === userId)

        if (isOnline) {
          send(ws, '@@SERVER/USER_CONNECTED', { id: userId })
        }
        break
      }

      // Messages

      case MessagesActionsTypes.REST_MESSAGES_POST_SUCCESS: {
        const threadId = action.payload.message.threadId
        const listeners = store.getState().data.threads[threadId]
        const sessions = store.getState().sessions

        wss.clients.forEach((client) => {
          const session = sessions[client['_id']]
          if (listeners.includes(session.userId)) {
            send(
              client,
              '@@SERVER/THREAD/MESSAGE_CREATED',
              { threadId },
            )
          }
        })
        break
      }

      case MessagesActionsTypes.REST_MESSAGES_PUT_SUCCESS:
      case MessagesActionsTypes.REST_MESSAGES_PATCH_SUCCESS: {
        const { threadId } = action.payload.message
        const listeners = store.getState().data.threads[threadId]
        const sessions = store.getState().sessions

        wss.clients.forEach((client) => {
          const session = sessions[client['_id']]
          if (listeners.includes(session.userId)) {
            send(
              client,
              '@@SERVER/THREAD/MESSAGE_UPDATED',
              action.payload,
            )
          }
        })
        break
      }

      case MessagesActionsTypes.REST_MESSAGES_DELETE_SUCCESS: {
        const { threadId } = action.payload.message
        const listeners = store.getState().data.threads[threadId]
        const sessions = store.getState().sessions

        wss.clients.forEach((client) => {
          const session = sessions[client['_id']]
          if (listeners.includes(session.userId)) {
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
  wss.clients.forEach((ws: ExtWebSocket) => {
    const session = store.getState().sessions[ws['_id']]
    if (session.isAlive === false) {
      return ws.terminate()
    }
    send(ws, SessionsActionsTypes.SESSION_CHECK_FETCH)
  })
}, PING_INTERVAL)

export default server
