import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

import {
  UUID
} from '../utils'

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

wss.on('connection', (ws: WebSocket) => {
  ws['_id'] = '#' + UUID.next()

  setInterval(() => {
    console.log(ws['_id'] + ' - ' + ws['_userId'] + ' - TO - @@SERVER/CONNECTION_CHECK')
    ws.send(JSON.stringify({
      type: '@@SERVER/CONNECTION_CHECK'
    }))
  }, 30000)

  ws.on('message', (message: string) => {
    const action = JSON.parse(message)

    console.log(ws['_id'] + ' - ' + ws['_userId'] + ' - FROM - ' + action.type)

    switch (action.type) {

      case '@@AUTH/GET_SUCCESS': {
        const id = action.payload.user.id
        ws['_userId'] = id
        addUserSession(id, ws['_id'])

        const data = {
          type: '@@SERVER/USER_CONNECTED',
          payload: { id }
        }

        wss.clients.forEach((client) => {
          if (client['_userId'] !== id) {
            client.send(JSON.stringify(data))
          }
        })
        break
      }

      case '@@AUTH/DELETE_SUCCESS': {
        const remaningConn = removeUserSession(ws['_userId'], ws['_id'])

        if (remaningConn.length === 0) {
          const data = {
            type: '@@SERVER/USER_DISCONNECTED',
            payload: { id: ws['_userId'] }
          }
          wss.clients.forEach((client) => {
            if (client['_userId'] !== ws['_userId']) {
              client.send(JSON.stringify(data))
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
          ws.send(JSON.stringify({
            type: '@@SERVER/USER_CONNECTED',
            payload: { id }
          }))
        }
        break
      }
    }
  })

  console.log('Connected to WS server ' + ws['_id'])
})

export default server
