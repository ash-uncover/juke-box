import { Reducer } from 'redux'
import { ActionsTypes } from './actions'
import { UserData } from '../../types'

export interface AuthState {
  authState: string,
  authToken: string | null,
  authError: string | null,
  authUsername: string | null,
  authPassword: string | null,
  authUser: UserData | null
}

export const initialState: AuthState = {
  authState: 'AUTH_NONE',
  authToken: null,
  authError: null,
  authUsername: null,
  authPassword: null,
  authUser: null
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.AUTH_GET_FETCH: {
      const { username, password } = action.payload
      return {
        ...state,
        authState: 'AUTH_CHECKING',
        authUsername: username,
        authPassword: password
      }
    }
    case ActionsTypes.AUTH_GET_SUCCESS: {
      const { user } = action.payload
      return {
        ...state,
        authState: 'AUTH_OK',
        authUser: user.id
      }
    }
    case ActionsTypes.AUTH_GET_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        authState: 'AUTH_ERROR',
        authError: error,
        authUsername: null,
        authPassword: null
      }
    }

    case ActionsTypes.AUTH_DELETE_FETCH: {
      return {
        ...state,
        authState: 'AUTH_DELETE'
      }
    }
    case ActionsTypes.AUTH_DELETE_SUCCESS: {
      return initialState
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