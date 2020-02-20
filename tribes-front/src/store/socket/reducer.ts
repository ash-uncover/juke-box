import { Reducer } from 'redux'
import { ActionsTypes } from './actions'
import { ActionsTypes as AuthActionsTypes } from '../auth/actions'

import { SocketStatus } from '../../utils/constants'

export interface SocketState {
  status: SocketStatus
}

export const initialState: SocketState = {
  status: SocketStatus.NOT_CONNECTED
}

const reducer: Reducer<SocketState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.SOCKECT_CONNECT_FETCH: {
      return {
        ...state,
        status: SocketStatus.CONNECTING
      }
    }
    case ActionsTypes.SOCKECT_CONNECT_SUCCESS: {
      return {
        ...state,
        status: SocketStatus.CONNECTED
      }
    }
    case ActionsTypes.SOCKECT_CONNECT_FAILURE: {
      return {
        ...state,
        status: SocketStatus.CONNECTION_ERROR
      }
    }

    default: {
      return state
    }
  }
}

export default reducer