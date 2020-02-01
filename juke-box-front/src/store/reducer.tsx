import { Reducer } from 'redux'
import { ActionsTypes } from './actions'

export interface AppState {
  readonly count: number,
  togglestate: boolean
}

export const initialState: AppState = {
  count: 0,
  togglestate: false
}

const reducer: Reducer<AppState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.USER_PUSH: {
      return { ...state, count: state.count + 10 }
    }
    case ActionsTypes.TIMEOUT: {
      return { ...state, count: state.count - 10 }
    }
    case ActionsTypes.SET_ON: {
      return { ...state, togglestate: true }
    }
    case ActionsTypes.SET_OFF: {
      return { ...state, togglestate: false }
    }
    default: {
      return state
    }
  }
}

export default reducer