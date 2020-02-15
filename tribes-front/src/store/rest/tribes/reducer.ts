import { Reducer } from 'redux'
import { ActionsTypes } from './actions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/actions'
import { TribeData } from '../../../types'

import { RequestState } from '../../../utils/constants'

export interface TribesState {
  data: Array<TribeData>,
  status: RequestState
}

export const initialState: TribesState = {
  data: [],
  status: RequestState.NEVER
}

const reducer: Reducer<TribesState> = (state = initialState, action) => {
  switch (action.type) {

    case ActionsTypes.REST_TRIBES_GETALL_FETCH: {
      return {
        ...state,
        status: RequestState.FETCHING
      }
    }
    case ActionsTypes.REST_TRIBES_GETALL_SUCCESS: {
      return {
        ...state,
        data: action.payload.tribes,
        status: RequestState.SUCCESS
      }
    }
    case ActionsTypes.REST_TRIBES_GETALL_FAILURE: {
      return {
        ...state,
        data: [],
        status: RequestState.FAILURE
      }
    }

    case AuthActionsTypes.AUTH_DELETE_SUCCESS: {
      return initialState
    }

    default: {
      return state
    }
  }
}

export default reducer