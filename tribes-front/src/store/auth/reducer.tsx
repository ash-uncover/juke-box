import { Reducer } from 'redux'
import { ActionsTypes } from './actions'

export interface AuthState {
  authState: string,
  authToken: string | null,
  authError: string | null,
  authUsername: string | null,
}

export const initialState: AuthState = {
  authState: 'AUTH_NONE',
  authToken: null,
  authError: null,
  authUsername: null
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.AUTH_GET_FETCH: {
      const { username } = action.payload
      return {
        ...state,
        authState: 'AUTH_CHECKING',
        authUsername: username
      }
    }
    case ActionsTypes.AUTH_GET_SUCCESS: {
      const { token } = action.payload
      return {
        ...state,
        authState: 'AUTH_OK',
        authToken: token
      }
    }
    case ActionsTypes.AUTH_GET_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        authState: 'AUTH_ERROR',
        authError: error
      }
    }

    case ActionsTypes.AUTH_DELETE_FETCH: {
      return {
        ...state,
        authState: 'AUTH_DELETE'
      }
    }
    case ActionsTypes.AUTH_DELETE_SUCCESS: {
      return {
        ...state,
        authState: 'AUTH_NONE',
        authToken: null,
        authUsername: null
      }
    }
    case ActionsTypes.AUTH_DELETE_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        authState: 'AUTH_ERROR',
        authError: error
      }
    }

    default: {
      return state
    }
  }
}

export default reducer