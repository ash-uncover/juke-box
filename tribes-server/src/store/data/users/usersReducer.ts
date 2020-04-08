import { Reducer } from 'redux'
import produce from 'immer'

import {
  ActionsTypes as UsersActionsTypes
} from './usersActions'

import {
  ActionsTypes as SessionsActionsTypes
} from '../../sessions/sessionsActions'

import {
  selectors as SessionsSelectors
} from '../../sessions'

import {
  add,
  remove,
} from '../../../utils/Sets'

export interface UsersState {
}

export const initialState: () => UsersState = () => ({})

const getUserState = (state: UsersState, id: string) => {
  if (!state[id]) {
    state[id] = []
  }
  return state[id]
}

const UsersReducer = (
  baseState = initialState(),
  action,
  rootState
) => {
  switch (action.type) {

    // Users

    case UsersActionsTypes.REST_USERS_GET_SUCCESS: {
      const { session, id } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        add(userState, session.userId)
      })
    }

    case SessionsActionsTypes.AUTH_DELETE_SUCCESS: {
      const { id, userId } = action.payload.session

      return produce(baseState, (state) => {
        const isLastSession = SessionsSelectors.isLastSession(rootState, userId, id)
        if (isLastSession) {
          Object.values(state).forEach((listeners: string[]) => {
            remove(listeners, userId)
          })
        }
      })
    }

    default: {
      return baseState
    }
  }
}

export default UsersReducer