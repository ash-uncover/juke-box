import { combineReducers } from 'redux'

import AuthReducer from './auth/authReducer'
import AppReducer from './app/appReducer'
import RestReducer from './rest/restReducer'
import SocketReducer from './socket/socketReducer'

const reducer = combineReducers({
  auth: AuthReducer,
  app: AppReducer,
  rest: RestReducer,
  socket: SocketReducer,
})

export default reducer