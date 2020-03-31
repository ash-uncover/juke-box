import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

import store from '../store'
import * as StoreUtils from '../utils/StoreUtils'

import {
  Actions as SocketActions,
  ActionsTypes as SocketActionsTypes
} from '../store/socket/socketActions'

import {
  selectors as SocketSelectiors
} from '../store/socket'

import {
  Actions as UsersActions,
  ActionsTypes as UsersActionsTypes
} from '../store/users/usersActions'

import SCHEMAS from '../database/schemas'

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

const DATA = {
  users: {},
  sessions: {}
}

const getOrInitUser = (userId) => {
  DATA.users[userId] = DATA.users[userId] || {
    listeners: [],
    sessions: []
  }
  return DATA.users[userId]
}

const addUserSession = (userId, connId) => {
  getOrInitUser(userId)
  DATA.users[userId].sessions.push(connId)
}

const removeUserSession = (userId, connId) => {
  getOrInitUser(userId)
  const index = DATA.users[userId].sessions.indexOf(connId)
  if (index > -1) {
    DATA.users[userId].sessions.splice(index, 1)
  }
  delete DATA.sessions[connId]
  return DATA.users[userId].sessions
}

const hasSessions = (userId) => {
  getOrInitUser(userId)
  return DATA.users[userId].sessions.length > 0
}

const addUserListener = (userId, listenerId) => {
  getOrInitUser(userId)
  DATA.users[userId].listeners.push(listenerId)
}

const removeUserListener = (userId, listenerId) => {
  getOrInitUser(userId)
  const index = DATA.users[userId].listeners.indexOf(listenerId)
  DATA.users[userId].listeners.splice(index, 1)
  return DATA.users[userId].listeners
}

const hasListeners = (userId) => {
  getOrInitUser(userId)
  return DATA.users[userId].listeners.length > 0
}

const removeSession = (sessionId) => {
  const session = DATA.sessions[sessionId]
  if (session && session['_userId']) {
    removeUserSession(session['_userId'], sessionId)
  } else {
    delete DATA.sessions[sessionId]
  }
}

const send = (ws, type = '@@UNKNOWN', payload = {}) => {
  LOGGER.debug(`${ws['_id'].substring(0, 4)} - ${nowString()} - ${ws['_userId']} - TO - ${type}`)
  ws.send(JSON.stringify({ type, payload }))
}

const received = (ws: WebSocket, message: string) => {
  try {
    const action = JSON.parse(message)
    LOGGER.debug(`${ws['_id'].substring(0, 4)} - ${nowString()} - ${ws['_userId']} - FROM - ${action.type}`)
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
    SocketActions.socketConnectSuccess(
      { id: sessionId }
    )
  )

  ws.on('close', (message: string) => {
    const session = SocketSelectiors.socketSessionSelector(sessionId)(store.getState())
    if (session.userId) {
      store.dispatch(
        UsersActions.authDeleteSuccess(
          session,
          { id: session.userId }
        )
      )
    }
    store.dispatch(
      SocketActions.socketCloseSuccess(
        session
      )
    )
  })

  ws.on('message', (message: string) => {
    const action = received(ws, message)
    store.dispatch(action)

    switch (action.type) {

      case UsersActionsTypes.AUTH_GET_SUCCESS: {
        const id = action.payload.user.id
        ws['_userId'] = id
        addUserSession(id, sessionId)

        LOGGER.warn(`${sessionId} - ${ws['_userId']} - CONNECT`)

        wss.clients.forEach((client) => {
          const userId = client['_userId']
          if (userId && userId !== id) {
            send(ws, '@@SERVER/USER_CONNECTED', { id: userId })
            send(client, '@@SERVER/USER_CONNECTED', { id })
          }
        })
        break
      }

      case UsersActionsTypes.AUTH_DELETE_SUCCESS: {
        const remaningConn = removeUserSession(ws['_userId'], sessionId)
        if (remaningConn.length === 0) {
          const id = ws['_userId']
          wss.clients.forEach((client) => {
            LOGGER.warn(client['_id'])
            if (client['_userId'] !== id) {
              send(client, '@@SERVER/USER_DISCONNECTED', { id })
            }
          })
        }
        delete ws['_userId']
        break
      }

      case UsersActionsTypes.REST_USERS_GET_SUCCESS: {
        const id = action.payload.user.id
        addUserListener(id, ws['_userId'])
        if (hasSessions(id)) {
          send(ws, '@@SERVER/USER_CONNECTED', { id })
        }
        break
      }

      case UsersActionsTypes.REST_MESSAGES_POST_SUCCESS: {
        const id = action.payload.message.id
        SCHEMAS.MESSAGES.model.findOne({ id }).exec((err, dataMessage) => {
          err ?
            LOGGER.error('@@REST/MESSAGES/POST_SUCCESS - Cannot retreive created message')
          :
            SCHEMAS.THREADS.model.findOne({ id: dataMessage.threadId }).exec((err, dataThread) => {
              err ?
                LOGGER.error('@@REST/MESSAGES/POST_SUCCESS - Cannot retreive parent thread')
              :
                dataThread.userId.forEach((userId) => {
                  DATA.users[userId].sessions.forEach((sessionId) => {
                    const session = DATA.sessions[sessionId]
                    send(session, '@@SERVER/THREAD/MESSAGE_POSTED', { threadId: dataMessage.threadId })
                  })
                })
            })
        })
        break
      }

      case UsersActionsTypes.REST_MESSAGES_PATCH_SUCCESS: {
        const { threadId, id } = action.payload.message
        SCHEMAS.THREADS.model.findOne({ id: threadId }).exec((err, dataThread) => {
          if (err) {
            LOGGER.error(`${UsersActionsTypes.REST_MESSAGES_PATCH_SUCCESS} - Error retreiving parent thread`)
          } else if (!dataThread) {
            LOGGER.error(`${UsersActionsTypes.REST_MESSAGES_PATCH_SUCCESS} - Cannot retreive parent thread`)
          } else {
            dataThread.userId.forEach((userId) => {
              DATA.users[userId].sessions.forEach((sesId) => {
                if (sesId !== sessionId) {
                  send(
                    DATA.sessions[sesId],
                    UsersActionsTypes.REST_MESSAGES_PATCH_SUCCESS,
                    { message: { id } }
                  )
                }
              })
            })
          }
        })
        break
      }

      case '@@REST/MESSAGES/DELETE_SUCCESS': {
        const { threadId } = action.payload.message
        SCHEMAS.THREADS.model.findOne({ id: threadId }).exec((err, dataThread) => {
          err ?
            LOGGER.error('@@REST/MESSAGES/DELETE_SUCCESS - Cannot retreive parent thread')
          :
            dataThread.userId.forEach((userId) => {
              DATA.users[userId].sessions.forEach((sesId) => {
                const session = DATA.sessions[sesId]
                send(session, '@@SERVER/THREAD/MESSAGE_DELETED', action.payload)
              })
            })
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
      removeUserSession(ws['_userId'], ws['_id'])
      return ws.terminate()
    }
    LOGGER.warn(`${ws['_id']} - ${ws['_userId']} - STILL ALIVE`)
    ws.isAlive = false
    send(ws, '@@SOCKET/CONNECTION_CHECK')
  })
}, PING_INTERVAL)

export default server
