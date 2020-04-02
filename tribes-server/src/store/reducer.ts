import {
  combineReducers
} from 'redux'

import DataReducer from './data/dataReducer'
import SessionsReducer from './sessions/sessionsReducer'

const reducer = combineReducers({
  data: DataReducer,
  sessions: SessionsReducer,
})

export default reducer