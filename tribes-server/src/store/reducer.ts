import {
  combineReducers
} from 'redux'

import DataReducer from './data/dataReducer'
import SessionsReducer from './sessions/sessionsReducer'

const reducer = (
  state = {
    data: undefined,
    sessions: undefined,
  },
  action,
) => ({
  data: DataReducer(state.data, action, state),
  sessions: SessionsReducer(state.sessions, action, state),
})

export default reducer