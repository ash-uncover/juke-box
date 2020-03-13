import { Reducer } from 'redux'
import produce from 'immer'

import { ActionsTypes as UserActionsTypes } from './userActions'

import {
  add,
  remove,
} from '../../utils/Sets'

export interface UserState {
}

export const initialState: () => UserState = () => ({})

const getUserState = (state: UserState, id: string) => {
  if (!state[id]) {
    state[id] = {
      listeners: [],
      sessions: [],
    }
  }
  return state[id]
}

const UserReducer: Reducer<UserState> = (baseState = initialState, action) => {
  switch (action.type) {

    case UserActionsTypes.AUTH_GET_SUCCESS: {
      const { session, user } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, user.id)
        add(userState.sessions, session.id)
      })
    }

    case UserActionsTypes.AUTH_DELETE_SUCCESS: {
      const { session, user } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, user.id)
        remove(userState.sessions, session.id)
      })
    }

    default: {
      return baseState
    }
  }
}

export default UserReducer