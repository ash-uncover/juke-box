import { Reducer } from 'redux'
import produce from 'immer'

import { ActionsTypes as SessionActionsTypes } from './socketActions'
import { ActionsTypes as UserActionsTypes } from '../users/userActions'

export interface SocketState {}

export const initialState: () => SocketState = () => ({})


export const initialSessionState = (id: string) => ({
  id,
  userId: null
})

const getSessionState = (state: SocketState, id: string) => {
  if (!state[id]) {
    state[id] = initialSessionState(id)
  }
  return state[id]
}

const SocketReducer: (baseState: SocketState, action: any) => SocketState = (
  baseState: SocketState = initialState(),
  action: any
) => {
  switch (action.type) {
    case SessionActionsTypes.SOCKET_CONNECT_SUCCESS: {
      const { session } = action.payload

      return produce(baseState, (state) => {
        getSessionState(state, session.id)
      })
    }

    case UserActionsTypes.AUTH_GET_SUCCESS: {
      const { session, user } = action.payload

      return produce(baseState, (state) => {
        const sessionState = getSessionState(state, session.id)
        sessionState.userId = user.id
      })
    }

    case UserActionsTypes.AUTH_DELETE_SUCCESS: {
      const { session, user } = action.payload

      return produce(baseState, (state) => {
        const sessionState = getSessionState(state, session.id)
        sessionState.userId = null
      })
    }

    default: {
      return baseState
    }
  }
}

export default SocketReducer