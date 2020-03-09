import { Reducer } from 'redux'
import produce from 'immer'

import { ActionsTypes } from './sessionActions'

export interface SessionState {
}

export const initialState: SessionState = {
}

const reducer: Reducer<SessionState> = (baseState = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.SOCKET_CONNECT_FETCH: {
      return produce(baseState, (state) => {

      })
    }

    default: {
      return baseState
    }
  }
}

export default reducer