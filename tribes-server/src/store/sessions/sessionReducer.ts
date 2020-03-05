import { Reducer } from 'redux'
import { ActionsTypes } from './sessionActions'

export interface SessionState {
}

export const initialState: SessionState = {
}

const reducer: Reducer<SessionState> = (state = initialState, action) => {
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