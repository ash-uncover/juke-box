import { Reducer } from 'redux'
import produce from 'immer'

import { ActionsTypes as UsersActionsTypes } from './usersActions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/authActions'
import { ActionsTypes as TribesActionsTypes} from '../tribes/tribesActions'

import { RequestState } from '../../../utils/constants'
import {
  ErrorData,
  FriendshipData,
  MembershipData,
  ThreadData,
  UserData,
} from '../../../types'

export interface UsersState {
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

export interface UserState {
  data: UserData | null,
  status: RequestState,
  error: ErrorData | null,
  friendshipsData: Array<string> | null,
  friendshipsStatus: RequestState,
  friendshipsError: ErrorData | null,
  membershipsData: Array<string> | null,
  membershipsStatus: RequestState,
  membershipsError: ErrorData | null,
  threadsData: Array<string> | null,
  threadsStatus: RequestState,
  threadsError: ErrorData | null,
}

export const initialUserState = () => ({
  data: null,
  status: RequestState.NEVER,
  error: null,
  friendshipsData: null,
  friendshipsStatus: RequestState.NEVER,
  friendshipsError: null,
  membershipsData: null,
  membershipsStatus: RequestState.NEVER,
  membershipsError: null,
  threadsData: null,
  threadsStatus: RequestState.NEVER,
  threadsError: null,
})

const getUserState = (state: UsersState, id: string) => {
  if (!state.data[id]) {
    state.data[id] = initialUserState()
  } else {
    state.data[id] = Object.assign({}, state.data[id])
  }
  state.data = Object.assign({}, state.data)
  return state.data[id]
}

const reducer: Reducer<UsersState> = (baseState = initialState, action) => {
  switch (action.type) {

    // GET /auth

    case AuthActionsTypes.AUTH_GET_SUCCESS: {
      const { user } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, user.id)
        userState.data = user
        userState.status = RequestState.SUCCESS
      })
    }

    // GET /users/{userId}

    case UsersActionsTypes.REST_USERS_GET_FETCH: {
      const { id } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        userState.error = null
        userState.status = RequestState.FETCHING
      })
    }
    case UsersActionsTypes.REST_USERS_GET_SUCCESS: {
      const { id, user } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        userState.data = user
        userState.error = null
        userState.status = RequestState.SUCCESS
      })
    }
    case UsersActionsTypes.REST_USERS_GET_FAILURE: {
      const { id, error } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        userState.data = null
        userState.error = error
        userState.status = RequestState.FAILURE
      })
    }

    // GET /users/{userId}/memberships

    case UsersActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_FETCH: {
      const { id } = action.payload


      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        userState.membershipsError = null
        userState.membershipsStatus = RequestState.FETCHING
      })
    }
    case UsersActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_SUCCESS: {
      const { id, memberships } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        userState.membershipsData = memberships.map((membership: MembershipData) => membership.id)
        userState.membershipsError = null
        userState.membershipsStatus = RequestState.SUCCESS
      })
    }
    case UsersActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_FAILURE: {
      const { id, error } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        userState.membershipsData = null
        userState.membershipsError = error
        userState.membershipsStatus = RequestState.FAILURE
      })
    }

    // GET /users/{userId}/friendships

    case UsersActionsTypes.REST_USERS_FRIENDSHIPS_GETALL_FETCH: {
      const { id } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        userState.friendshipsError = null
        userState.friendshipsStatus = RequestState.FETCHING
      })
    }
    case UsersActionsTypes.REST_USERS_FRIENDSHIPS_GETALL_SUCCESS: {
      const { id, friendships } = action.payload

      return produce(baseState, (state) => {
        friendships.forEach((friendship: FriendshipData) => {
          getUserState(state, friendship.friendId)
        })

        const userState = getUserState(state, id)
        userState.friendshipsData = friendships.map((friendship: FriendshipData) => friendship.id)
        userState.friendshipsError = null
        userState.friendshipsStatus = RequestState.SUCCESS
      })
    }
    case UsersActionsTypes.REST_USERS_FRIENDSHIPS_GETALL_FAILURE: {
      const { id, error } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        userState.friendshipsData = null
        userState.friendshipsError = error
        userState.friendshipsStatus = RequestState.FAILURE
      })
    }

    // GET /users/{userId}/threads

    case UsersActionsTypes.REST_USERS_THREADS_GETALL_FETCH: {
      const { id } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        userState.threadsError = null
        userState.threadsStatus = RequestState.FETCHING
      })
    }
    case UsersActionsTypes.REST_USERS_THREADS_GETALL_SUCCESS: {
      const { id, threads } = action.payload

      return produce(baseState, (state) => {
        threads.forEach((thread: ThreadData) => {
          thread.userId.forEach((userId: string) => {
            getUserState(state, userId)
          })
        })

        const userState = getUserState(state, id)
        userState.threadsData = threads.map((thread: ThreadData) => thread.id)
        userState.threadsError = null
        userState.threadsStatus = RequestState.SUCCESS
      })
    }
    case UsersActionsTypes.REST_USERS_THREADS_GETALL_FAILURE: {
      const { id, error } = action.payload

      return produce(baseState, (state) => {
        const userState = getUserState(state, id)
        userState.threadsData = null
        userState.threadsError = error
        userState.threadsStatus = RequestState.FAILURE
      })
    }

    // GET /tribes/{tribeId}/memberships

    case TribesActionsTypes.REST_TRIBES_MEMBERSHIPS_GETALL_SUCCESS: {
      const { memberships } = action.payload

      return produce(baseState, (state) => {
        memberships.forEach((membership: MembershipData) => {
          getUserState(state, membership.userId)
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