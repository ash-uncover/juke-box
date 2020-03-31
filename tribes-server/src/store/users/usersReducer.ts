import { Reducer } from 'redux'
import produce from 'immer'

import {
  ActionsTypes as SocketActionsTypes
} from '../socket/socketActions'

import {
  ActionsTypes as UsersActionsTypes
} from './usersActions'

import {
  add,
  remove,
} from '../../utils/Sets'

export interface UsersState {
}

export const initialState: () => UsersState = () => ({})

const getUserState = (state: UsersState, id: string) => {
  if (!state[id]) {
    state[id] = {
      listeners: [],
      sessions: [],
    }
  }
  return state[id]
}

const UsersReducer: Reducer<UsersState> = (baseState = initialState(), action) => {
  switch (action.type) {

    case UsersActionsTypes.AUTH_GET_SUCCESS: {
      const { session, user } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, user.id)
        add(userState.sessions, session.id)
      })
    }

    case UsersActionsTypes.AUTH_DELETE_SUCCESS: {
      const { session, user } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, user.id)
        remove(userState.sessions, session.id)
      })
    }

    case SocketActionsTypes.SOCKET_CLOSE_SUCCESS: {
      const { session } = action.payload

      return produce(baseState, (state) => {
        delete state[session.id]
      })
    }

    default: {
      return baseState
    }
  }
}

export default UsersReducer