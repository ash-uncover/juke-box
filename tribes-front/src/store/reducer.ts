import { combineReducers } from 'redux'

import AuthReducer from './auth/reducer'
import RestReducer from './rest/reducer'
import SocketReducer from './socket/reducer'

const reducer = combineReducers({
  auth: AuthReducer,
  rest: RestReducer,
  socket: SocketReducer,
})

export default reducer