import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

import SCHEMAS from '../database/schemas'

import {
  UUID,
  dateString,
  nowString,
} from '../utils'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('server-sockets')

interface ExtWebSocket extends WebSocket {
  isAlive: boolean
}

const PING_INTERVAL = 30000

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
  DATA.users[userId].sessions.splice(index, 1)
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

const send = (ws, type = '@@UNKNOWN', payload = {}) => {
  LOGGER.info(`${ws['_id'].substring(0, 4)} - ${nowString()} - ${ws['_userId']} - TO - ${type}`)
  ws.send(JSON.stringify({ type, payload }))
}

const received = (ws: WebSocket, message: string) => {
  try {
    const action = JSON.parse(message)
    LOGGER.info(`${ws['_id'].substring(0, 4)} - ${nowString()} - ${ws['_userId']} - FROM - ${action.type}`)
    return action
  } catch (error) {
    LOGGER.error(`Failed to parse: ${message}`)
    return {}
  }
}

wss.on('connection', (ws: ExtWebSocket) => {
  ws['_id'] = '#' + UUID.next()
  DATA.sessions[ws['_id']] = ws

  ws.on('message', (message: string) => {
    const action = received(ws, message)

    switch (action.type) {

      case '@@SOCKET/CONNECTION_CHECK': {
        ws.isAlive = true
        break
      }

      case '@@AUTH/GET_SUCCESS': {
        const id = action.payload.user.id
        ws['_userId'] = id
        addUserSession(id, ws['_id'])

        wss.clients.forEach((client) => {
          if (client['_userId'] !== id) {
            send(ws, '@@SERVER/USER_CONNECTED', { id })
          }
        })
        break
      }

      case '@@AUTH/DELETE_SUCCESS': {
        const remaningConn = removeUserSession(ws['_userId'], ws['_id'])
        if (remaningConn.length === 0) {
          const id = ws['_userId']
          wss.clients.forEach((client) => {
            if (client['_userId'] !== ws['_userId']) {
              send(ws, '@@SERVER/USER_DISCONNECTED', { id })
            }
          })
        }
        delete ws['_userId']
        break
      }

      case '@@REST/USERS/GET_SUCCESS': {
        const id = action.payload.user.id
        addUserListener(id, ws['_userId'])
        if (hasSessions(id)) {
          send(ws, '@@SERVER/USER_CONNECTED', { id })
        }
        break
      }

      case '@@REST/MESSAGES/POST_SUCCESS': {
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
    }
  })

  LOGGER.info('Connected to WS server ' + ws['_id'])
})

setInterval(() => {
  wss.clients.forEach((ws: ExtWebSocket) => {
    if (ws.isAlive === false) {
      LOGGER.warn(`${ws['_id']} - ${ws['_userId']} - CONNECTION LOST`)
      delete DATA.sessions[ws['_id']]
      return ws.terminate()
    }
    ws.isAlive = false
    send(ws, '@@SOCKET/CONNECTION_CHECK')
  })
}, PING_INTERVAL)

export default server
