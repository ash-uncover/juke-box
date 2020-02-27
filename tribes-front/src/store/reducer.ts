import { combineReducers } from 'redux'

import AuthReducer from './auth/authReducer'
import RestReducer from './rest/reducer'
import SocketReducer from './socket/socketReducer'

const reducer = combineReducers({
  auth: AuthReducer,
  rest: RestReducer,
  socket: SocketReducer,
})

export default reducer