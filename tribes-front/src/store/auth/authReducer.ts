import { Reducer } from 'redux'
import { ActionsTypes } from './authActions'
import { UserData } from '../../types'
import { AuthStatus } from '../../utils/constants'

export interface AuthState {
  authState: AuthStatus,
  authToken: string | null,
  authError: string | null,
  authUsername: string | null,
  authPassword: string | null,
  authUser: UserData | null,
}

export const initialState: AuthState = {
  authState: AuthStatus.NONE,
  authToken: null,
  authError: null,
  authUsername: null,
  authPassword: null,
  authUser: null,
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.AUTH_GET_FETCH: {
      const { username, password } = action.payload
      return {
        ...state,
        authState: AuthStatus.AUTHENTICATING,
        authUsername: username,
        authPassword: password,
      }
    }
    case ActionsTypes.AUTH_GET_SUCCESS: {
      const { user } = action.payload
      return {
        ...state,
        authState: AuthStatus.AUTHENTICATED,
        authUser: user.id,
      }
    }
    case ActionsTypes.AUTH_GET_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        authState: AuthStatus.AUTHENTICATION_ERROR,
        authError: error,
        authUsername: null,
        authPassword: null,
      }
    }

    case ActionsTypes.AUTH_DELETE_FETCH: {
      return {
        ...state,
        authState: AuthStatus.DISCONNECTING,
      }
    }
    case ActionsTypes.AUTH_DELETE_SUCCESS: {
      return initialState
    }
    case ActionsTypes.AUTH_DELETE_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        authState: AuthStatus.DISCONNECTED,
        authError: error,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer