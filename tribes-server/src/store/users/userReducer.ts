import { Reducer } from 'redux'
import { ActionsTypes } from './userActions'

export interface UserState {
}

export const initialState: UserState = {
}

const reducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.SOCKET_CONNECT_FETCH: {
      return {
        ...state
      }
    }

    default: {
      return state
    }
  }
}

export default reducer