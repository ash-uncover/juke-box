import {
  combineReducers
} from 'redux'

import SocketReducer from './socket/socketReducer'
import UsersReducer from './users/usersReducer'

const reducer = combineReducers({
  socket: SocketReducer,
  users: UsersReducer,
})

export default reducer