import { Reducer } from 'redux'

import { ActionsTypes as UsersActionsTypes } from './actions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/actions'
import { ActionsTypes as TribesActionsTypes} from '../tribes/actions'

import { RequestState } from '../../../utils/constants'
import {
  ErrorData,
  MembershipData,
  UserData
} from '../../../types'

export interface UsersState {
  data: any,
  status: RequestState,
  error: ErrorData | null
}

export const initialState: UsersState = {
  data: {},
  status: RequestState.NEVER,
  error: null
}

export interface UserState {
  data: UserData | null,
  status: RequestState,
  error: ErrorData | null,
  membershipsData: Array<string> | null,
  membershipsStatus: RequestState,
  membershipsError: ErrorData | null
}

export const initialUserState = () => ({
  data: null,
  status: RequestState.NEVER,
  error: null,
  membershipsData: null,
  membershipsStatus: RequestState.NEVER,
  membershipsError: null
})

const getUserState = (state: UsersState, id: string) => {
  if (!state.data[id]) {
    state.data[id] = initialUserState()
  }
  return state.data[id]
}

const reducer: Reducer<UsersState> = (state = initialState, action) => {
  switch (action.type) {

    // GET /auth

    case AuthActionsTypes.AUTH_GET_SUCCESS: {
      const { user } = action.payload

      const userState = getUserState(state, user.id)
      userState.data = user
      userState.status = RequestState.SUCCESS

      return { ...state }
    }

    // GET /users/{userId}

    case UsersActionsTypes.REST_USERS_GET_FETCH: {
      const { id } = action.payload

      const userState = getUserState(state, id)
      userState.error = null
      userState.status = RequestState.FETCHING

      return { ...state }
    }
    case UsersActionsTypes.REST_USERS_GET_SUCCESS: {
      const { id, user } = action.payload

      const userState = getUserState(state, id)
      userState.data = user
      userState.error = null
      userState.status = RequestState.SUCCESS

      return { ...state }
    }
    case UsersActionsTypes.REST_USERS_GET_FAILURE: {
      const { id, error } = action.payload

      const userState = getUserState(state, id)
      userState.data = null
      userState.error = error
      userState.status = RequestState.FAILURE

      return { ...state }
    }

    // GET /users/{userId}/memberships

    case UsersActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_FETCH: {
      const { id } = action.payload

      const userState = getUserState(state, id)
      userState.membershipsError = null
      userState.membershipsStatus = RequestState.FETCHING

      return { ...state }
    }
    case UsersActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_SUCCESS: {
      const { id, memberships } = action.payload

      const userState = getUserState(state, id)
      userState.membershipsData = memberships.map((membership: MembershipData) => membership.id)
      userState.membershipsError = null
      userState.membershipsStatus = RequestState.SUCCESS

      return { ...state }
    }
    case UsersActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_FAILURE: {
      const { id, error } = action.payload

      const userState = getUserState(state, id)
      userState.membershipsData = null
      userState.membershipsError = error
      userState.membershipsStatus = RequestState.FAILURE

      return { ...state }
    }

    // GET /tribes/{tribeId}/memberships

    case TribesActionsTypes.REST_TRIBES_MEMBERSHIPS_GETALL_SUCCESS: {
      const { memberships } = action.payload

      memberships.forEach((membership: MembershipData) => {
        getUserState(state, membership.userId)
      })

      return { ...state }
    }

    // DELETE /auth

    case AuthActionsTypes.AUTH_DELETE_SUCCESS: {
      return initialState
    }

    default: {
      return state
    }
  }
}

export default reducer