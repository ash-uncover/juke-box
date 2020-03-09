import { Reducer } from 'redux'
import produce from 'immer'

import { ActionsTypes } from './friendshipsActions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/authActions'
import { ActionsTypes as UsersActionsTypes } from '../users/usersActions'

import {
  ErrorData,
  FriendshipData,
} from '../../../types'

import { RequestState } from '../../../utils/constants'

export interface FriendshipsState {
  data: any,
  status: RequestState,
  error: ErrorData | null,
}

export const getInitialState = () => ({
  data: {},
  status: RequestState.NEVER,
  error: null,
})
const initialState = getInitialState()

export interface FriendshipState {
  data: FriendshipData | null,
  status: RequestState,
  error: ErrorData | null,
}

export const initialFriendshipState = () => ({
  data: null,
  status: RequestState.NEVER,
  error: null,
})

const getFriendshipState = (state: FriendshipsState, id: string) => {
  if (!state.data[id]) {
    state.data[id] = initialFriendshipState()
  }
  return state.data[id]
}

const reducer: Reducer<FriendshipsState> = (baseState = initialState, action) => {
  switch (action.type) {

    // GET /uesrs/{userId}/friendships

    case UsersActionsTypes.REST_USERS_FRIENDSHIPS_GETALL_SUCCESS: {
      const { friendships } = action.payload

      return produce(baseState, (state) => {
        friendships.forEach((friendship: FriendshipData) => {
          const friendshipState = getFriendshipState(state, friendship.id)
          friendshipState.data = friendship
          friendshipState.error = null
          friendshipState.status = RequestState.SUCCESS
        })
      })
    }

    // DELETE /auth

    case AuthActionsTypes.AUTH_DELETE_SUCCESS: {
      return getInitialState()
    }

    default: {
      return baseState
    }
  }
}

export default reducer