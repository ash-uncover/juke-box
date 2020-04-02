import { Reducer } from 'redux'
import produce from 'immer'

import { ActionsTypes } from './socketActions'
import { ActionsTypes as AuthActionsTypes } from '../auth/authActions'

import {
  SocketStatus,
  UserStatus,
} from '../../utils/constants'

export interface SocketState {
  status: SocketStatus,
  users: any
}

export const initialState: SocketState = {
  status: SocketStatus.NOT_CONNECTED,
  users: {},
}

const reducer: Reducer<SocketState> = (baseState = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.SESSION_CONNECT_FETCH: {
      return produce(baseState, (state) => {
        state.status = SocketStatus.CONNECTING
      })
    }
    case ActionsTypes.SESSION_CONNECT_SUCCESS: {
      return produce(baseState, (state) => {
        state.status = SocketStatus.CONNECTED
      })
    }
    case ActionsTypes.SESSION_CONNECT_FAILURE: {
      return produce(baseState, (state) => {
        state.status = SocketStatus.CONNECTION_ERROR
      })
    }

    case ActionsTypes.SERVER_USER_CONNECTED: {
      const id = action.payload.id
      return produce(baseState, (state) => {
        state.users[`${id}`] = UserStatus.ONLINE
      })
    }

    case ActionsTypes.SERVER_USER_DISCONNECTED: {
      const id = action.payload.id
      return produce(baseState, (state) => {
        state.users[`${id}`] = UserStatus.OFFLINE
      })
    }

    case AuthActionsTypes.AUTH_GET_SUCCESS: {
      const { user } = action.payload
      return produce(baseState, (state) => {
        state.users[`${user.id}`] = UserStatus.ONLINE
      })
    }

    default: {
      return baseState
    }
  }
}

export default reducer