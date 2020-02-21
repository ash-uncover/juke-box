import { action } from 'typesafe-actions'
import {
  Actions as SocketActions,
  ActionsTypes as SocketActionsTypes
} from '../store/socket/actions'

const CONN_TIMEOUT = 10000

class SocketService {

  private _socket: WebSocket | null
  private _interval: any

  constructor() {
    this._socket = null
    this._interval = null
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
    let interval
    const fnInterval = () => {
      try {
        this.send({
          type: SocketActionsTypes.SOCKECT_CONNECTION_CHECK
        })
      } catch (error) {
        this.close(dispatch)
      }
    }
    socket.onopen = function(event) {
      dispatch(SocketActions.socketConnectSuccess())

      interval = setInterval(fnInterval, CONN_TIMEOUT)

      this.onmessage = (event: any) => {
        const actionData = JSON.parse(event.data)
        dispatch(action(actionData.type, actionData.payload))
      }
    }

    socket.onerror = (error) => {
      dispatch(SocketActions.socketConnectFailure())
    }

    this._socket = socket
    this._interval = interval
  }

  close(dispatch: any) {
    this._socket && this._socket.close()
    dispatch(SocketActions.socketConnectionLost())
  }
}

const service = new SocketService()
export default service