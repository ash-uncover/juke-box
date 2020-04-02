import {
  combineReducers
} from 'redux'

import MessagesReducer from './messages/messagesReducer'
import ThreadsReducer from './threads/threadsReducer'
import TribesReducer from './tribes/tribesReducer'
import UsersReducer from './users/usersReducer'

const reducer = combineReducers({
  messages: MessagesReducer,
  threads: ThreadsReducer,
  tribes: TribesReducer,
  users: UsersReducer,
})

export default reducer