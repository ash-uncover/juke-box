import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws: WebSocket) => {

  ws.on('message', (message: string) => {
    ws.send(`Hello, you sent -> ${message}`)
  })

  ws.send('Hi there, I am a WebSocket server')
})

export default server
