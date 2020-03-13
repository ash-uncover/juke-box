import {
  combineReducers
} from 'redux'

import SocketReducer from './socket/socketReducer'
import UserReducer from './users/userReducer'

const reducer = combineReducers({
  socket: SocketReducer,
  users: UserReducer,
})

export default reducer