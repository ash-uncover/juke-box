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

const addUserConnection = (userId, connId) => {
  DATA.users[userId] = DATA.users[userId] || []
  DATA.users[userId].push(connId)
}

const removeUserConnection = (userId, connId) => {
  const index = DATA.users[userId].indexOf(connId)
  DATA.users[userId].splice(index, 1)
  return DATA.users[userId]
}

wss.on('connection', (ws: WebSocket) => {
  ws['_id'] = '#' + count++

  ws.on('message', (message: string) => {
    const action = JSON.parse(message)

    switch (action.type) {

      case '@@AUTH/GET_SUCCESS': {
        const id = action.payload.user.id
        ws['_userId'] = id
        addUserConnection(id, ws['_id'])

        const data = {
          type: '@@SERVER/SOCKET/USER_CONNECTED',
          payload: { id }
        }

        wss.clients.forEach((client) => {
          if (client['_userId'] !== id) {
            client.send(JSON.stringify(data));
          }
        })
        break
      }

      case '@@AUTH/DELETE_SUCCESS': {
        const remaningConn = removeUserConnection(ws['_userId'], ws['_id'])
        console.log(remaningConn)
        if (remaningConn.length === 0) {
          const data = {
            type: '@@SERVER/SOCKET/USER_DISCONNECTED',
            payload: { id: ws['_userId'] }
          }
          wss.clients.forEach((client) => {
            if (client['_userId'] !== ws['_userId']) {
              client.send(JSON.stringify(data));
            }
          })
        }

        delete ws['_userId']
        break
      }
    }
  })

  console.log('Connected to WS server ' + ws['_id'])
})

export default server
