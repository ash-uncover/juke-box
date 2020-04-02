import { Reducer } from 'redux'
import produce from 'immer'

import {
  ActionsTypes as UsersActionsTypes
} from './usersActions'

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

const UsersReducer: Reducer<UsersState> = (baseState = initialState(), action) => {
  switch (action.type) {

    // Users

    case UsersActionsTypes.REST_USERS_GET_SUCCESS: {
      const { session, id } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        add(userState, session.userId)
      })
    }

    default: {
      return baseState
    }
  }
}

export default UsersReducer