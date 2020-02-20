import { Reducer } from 'redux'
import { ActionsTypes } from './actions'
import { ActionsTypes as AuthActionsTypes } from '../auth/actions'

import {
  AuthStatus,
  SocketStatus,
  UserStatus,
} from '../../utils/constants'

export interface SocketState {
  status: SocketStatus,
  users: any
}

export const initialState: SocketState = {
  status: SocketStatus.NOT_CONNECTED,
  users: {}
}

const reducer: Reducer<SocketState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.SOCKECT_CONNECT_FETCH: {
      return {
        ...state,
        status: SocketStatus.CONNECTING
      }
    }
    case ActionsTypes.SOCKECT_CONNECT_SUCCESS: {
      return {
        ...state,
        status: SocketStatus.CONNECTED
      }
    }
    case ActionsTypes.SOCKECT_CONNECT_FAILURE: {
      return {
        ...state,
        status: SocketStatus.CONNECTION_ERROR
      }
    }

    case ActionsTypes.SERVER_USER_CONNECTED: {
      const id = action.payload.id
      const users = Object.assign(
        {},
        state.users,
        { [`${id}`]: UserStatus.ONLINE }
      )
      return {
        ...state,
        users
      }
    }

    case ActionsTypes.SERVER_USER_DISCONNECTED: {
      const id = action.payload.id
      const users = Object.assign(
        {},
        state.users,
        { [`${id}`]: UserStatus.OFFLINE }
      )
      return {
        ...state,
        users
      }
    }

    case AuthActionsTypes.AUTH_GET_SUCCESS: {
      const { user } = action.payload
      const users = Object.assign(
        {},
        state.users,
        { [`${user.id}`]: UserStatus.ONLINE }
      )
      return {
        ...state,
        users
      }
    }

    default: {
      return state
    }
  }
}

export default reducer