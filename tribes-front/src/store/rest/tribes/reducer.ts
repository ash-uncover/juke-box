import { Reducer } from 'redux'

import { ActionsTypes as TribesActionsTypes} from './actions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/actions'
import { ActionsTypes as UsersActionsTypes } from '../users/actions'

import {
  ErrorData,
  MembershipData,
  TribeData
} from '../../../types'

import { RequestState } from '../../../utils/constants'

export interface TribesState {
  data: any,
  status: RequestState,
  error: ErrorData | null
}

export const initialState: TribesState = {
  data: {},
  status: RequestState.NEVER,
  error: null
}

export interface TribeState {
  data: TribeData | null,
  status: RequestState,
  error: ErrorData | null
}

export const initialTribeState = () => ({
  data: null,
  status: RequestState.NEVER,
  error: null
})

const getTribeState = (state: TribesState, id: string) => {
  if (!state.data[id]) {
    state.data[id] = initialTribeState()
  }
  return state.data[id]
}

const reducer: Reducer<TribesState> = (state = initialState, action) => {
  switch (action.type) {

    // GET /tribes/{tribeId}

    case TribesActionsTypes.REST_TRIBES_GET_FETCH: {
      const { id } = action.payload

      const tribeState = getTribeState(state, id)
      tribeState.error = null
      tribeState.status = RequestState.FETCHING

      return { ...state }
    }
    case TribesActionsTypes.REST_TRIBES_GET_SUCCESS: {
      const { id, tribe } = action.payload

      const tribeState = getTribeState(state, id)
      tribeState.data = tribe
      tribeState.error = null
      tribeState.status = RequestState.SUCCESS

      return { ...state }
    }
    case TribesActionsTypes.REST_TRIBES_GET_FAILURE: {
      const { id, error } = action.payload

      const tribeState = getTribeState(state, id)
      tribeState.data = null
      tribeState.error = error
      tribeState.status = RequestState.FAILURE

      return { ...state }
    }

    // GET /users/{userId}/memberships

    case UsersActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_SUCCESS: {
      const { memberships } = action.payload

      memberships.forEach((membership: MembershipData) => {
        getTribeState(state, membership.tribeId)
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