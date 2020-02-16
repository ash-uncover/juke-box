import { Reducer } from 'redux'
import { ActionsTypes } from './actions'
import { RequestState } from '../../../utils/constants'

export interface UsersState {
  data: any,
  status: RequestState
}

export const initialState: UsersState = {
  data: {},
  status: RequestState.NEVER
}

const reducer: Reducer<UsersState> = (state = initialState, action) => {
  switch (action.type) {

    case ActionsTypes.REST_USERS_GET_FETCH: {
      const { id } = action.payload
      return {
        ...state,
        status: RequestState.FETCHING
      }
    }
    case ActionsTypes.REST_USERS_GET_SUCCESS: {
      const { user } = action.payload
      return {
        ...state,
        data: action.payload.tribes,
        status: RequestState.SUCCESS
      }
    }
    case ActionsTypes.REST_USERS_GET_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        data: [],
        status: RequestState.FAILURE
      }
    }

    default: {
      return state
    }
  }
}

export default reducer