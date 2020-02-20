import { action } from 'typesafe-actions'
import { Actions as SocketActions } from '../store/socket/actions'

class SocketService {

  private _socket: WebSocket | null

  constructor() {
    this._socket = null
  }

  get socket() {
    return this._socket
  }

  send(data: any) {
    if (this._socket !== null)  {
      this._socket.send(JSON.stringify(data))
    } else {
      throw new Error('not connected')
    }
  }

  connect(dispatch: any, url: string) {
    dispatch(SocketActions.socketConnectFetch())

    const socket = new WebSocket(url)

    socket.onopen = function(event) {
      dispatch(SocketActions.socketConnectSuccess())
      this.onmessage = (event: any) => {
        const actionData = JSON.parse(event.data)
        dispatch(action(actionData.type, actionData.payload))
      }
    }

    socket.onerror = (error) => {
      dispatch(SocketActions.socketConnectFailure())
    }

    this._socket = socket
  }
}

const service = new SocketService()
export default service