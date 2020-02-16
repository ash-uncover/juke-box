import { Reducer } from 'redux'

import { ActionsTypes } from './actions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/actions'
import { ActionsTypes as UsersActionsTypes } from '../users/actions'

import {
  ErrorData,
  MembershipData
} from '../../../types'

import { RequestState } from '../../../utils/constants'

export interface MembershipsState {
  data: any,
  status: RequestState,
  error: ErrorData | null
}

export const initialState: MembershipsState = {
  data: {},
  status: RequestState.NEVER,
  error: null
}

export interface MembershipState {
  data: MembershipData | null,
  status: RequestState,
  error: ErrorData | null
}

export const initialMembershipState = () => ({
  data: null,
  status: RequestState.NEVER,
  error: null
})

const getMembershipState = (state: MembershipsState, id: string) => {
  if (!state.data[id]) {
    state.data[id] = initialMembershipState()
  }
  return state.data[id]
}

const reducer: Reducer<MembershipsState> = (state = initialState, action) => {
  switch (action.type) {

    // GET /users/{userId}/memberships

    case UsersActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_FETCH: {
      return { ...state }
    }
    case UsersActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_SUCCESS: {
      const { memberships } = action.payload

      memberships.forEach((membership: MembershipData) => {
        const membershipState = getMembershipState(state, membership.id)
        membershipState.data = membership
        membershipState.error = null
        membershipState.status = RequestState.SUCCESS
      })

      return { ...state }
    }
    case UsersActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_FAILURE: {
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