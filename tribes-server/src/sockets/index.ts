import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

let count = 0

const DATA = {
  users: {
  }
}

const getOrInitUser = (userId) => {
  DATA.users[userId] = DATA.users[userId] || {
    listeners: [],
    sessions: []
  }
  return DATA.users[userId]
}

const addUserConnection = (userId, connId) => {
  DATA.users[userId] = getOrInitUser(userId)
  DATA.users[userId].sessions.push(connId)
}

const removeUserConnection = (userId, connId) => {
  const index = DATA.users[userId].sessions.indexOf(connId)
  DATA.users[userId].sessions.splice(index, 1)
  return DATA.users[userId].sessions
}

const addUserListener = (userId, listenerId) => {
  DATA.users[userId] = getOrInitUser(userId)
  DATA.users[userId].listeners.push(listenerId)
}

const hasSessions = (userId) => {
  DATA.users[userId] = getOrInitUser(userId)
  return DATA.users[userId].sessions.length > 0
}


wss.on('connection', (ws: WebSocket) => {
  ws['_id'] = '#' + count++

  ws.on('message', (message: string) => {
    const action = JSON.parse(message)

    console.log(ws['_id'] + ' - ' + ws['_userId'] + ' - ' + action.type)

    switch (action.type) {

      case '@@AUTH/GET_SUCCESS': {
        const id = action.payload.user.id
        ws['_userId'] = id
        addUserConnection(id, ws['_id'])

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
        const remaningConn = removeUserConnection(ws['_userId'], ws['_id'])

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