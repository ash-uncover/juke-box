import { Reducer } from 'redux'
import produce from 'immer'

import { ActionsTypes as AuthActionsTypes } from '../../auth/authActions'
import { ActionsTypes as TribesActionsTypes } from '../tribes/tribesActions'
import { ActionsTypes as UsersActionsTypes } from '../users/usersActions'

import {
  ErrorData,
  MembershipData,
} from '../../../types'

import { RequestState } from '../../../utils/constants'

export interface MembershipsState {
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

export interface MembershipState {
  data: MembershipData | null,
  status: RequestState,
  error: ErrorData | null,
}

export const initialMembershipState = () => ({
  data: null,
  status: RequestState.NEVER,
  error: null,
})

const getMembershipState = (state: MembershipsState, id: string) => {
  if (!state.data[id]) {
    state.data[id] = initialMembershipState()
  }
  return state.data[id]
}

const reducer: Reducer<MembershipsState> = (baseState = initialState, action) => {
  switch (action.type) {

    // GET /tribes/{tribeId}/memberships

    case TribesActionsTypes.REST_TRIBES_MEMBERSHIPS_GETALL_SUCCESS: {
      const { memberships } = action.payload

      return produce(baseState, (state) => {
        memberships.forEach((membership: MembershipData) => {
          const membershipState = getMembershipState(state, membership.id)
          membershipState.data = membership
          membershipState.error = null
          membershipState.status = RequestState.SUCCESS
        })
      })
    }

    // GET /users/{userId}/memberships

    case UsersActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_SUCCESS: {
      const { memberships } = action.payload

      return produce(baseState, (state) => {
        memberships.forEach((membership: MembershipData) => {
          const membershipState = getMembershipState(state, membership.id)
          membershipState.data = membership
          membershipState.error = null
          membershipState.status = RequestState.SUCCESS
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