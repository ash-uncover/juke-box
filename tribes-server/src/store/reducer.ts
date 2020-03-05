import {
  combineReducers
} from 'redux'

import SessionReducer from './sessions/sessionReducer'
import UserReducer from './users/userReducer'

const reducer = combineReducers({
  sessions: SessionReducer,
  users: UserReducer,
})

export default reducer