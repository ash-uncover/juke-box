import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

let count = 0

wss.on('connection', (ws: WebSocket) => {
  ws['_id'] = '#' + count++

  ws.on('message', (message: string) => {
    const action = JSON.parse(message)

    switch (action.type) {

      case '@@AUTH/GET_SUCCESS': {
        ws['_userId'] = action.payload.user.id
        const data = {
          type: '@@SERVER/SOCKET/USER_CONNECTED',
          payload: { id: ws['_userId'] }
        }
        wss.clients.forEach((client) => {
          if (client != ws) {
            client.send(JSON.stringify(data));
          }
        })
        break
      }

      case '@@AUTH/DELETE_SUCCESS': {
        const data = {
          type: '@@SERVER/SOCKET/USER_DISCONNECTED',
          payload: { id: ws['_userId'] }
        }
        delete ws['_userId']
        wss.clients.forEach((client) => {
          if (client != ws) {
            client.send(JSON.stringify(data));
          }
        })
        break
      }
    }
  })

  console.log('Connected to WS server ' + ws['_id'])
})

export default server
