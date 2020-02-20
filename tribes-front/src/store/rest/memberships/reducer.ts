import { Reducer } from 'redux'

import { ActionsTypes } from './actions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/actions'
import { ActionsTypes as TribesActionsTypes } from '../tribes/actions'
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

export const getInitialState = () => ({
  data: {},
  status: RequestState.NEVER,
  error: null
})
const initialState = getInitialState()

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

    // GET /tribes/{tribeId}/memberships

    case TribesActionsTypes.REST_TRIBES_MEMBERSHIPS_GETALL_SUCCESS: {
      const { memberships } = action.payload

      memberships.forEach((membership: MembershipData) => {
        const membershipState = getMembershipState(state, membership.id)
        membershipState.data = membership
        membershipState.error = null
        membershipState.status = RequestState.SUCCESS
      })

      return { ...state }
    }

    // GET /users/{userId}/memberships

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

    // DELETE /auth

    case AuthActionsTypes.AUTH_DELETE_SUCCESS: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}

export default reducer