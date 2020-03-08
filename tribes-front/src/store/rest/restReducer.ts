import { combineReducers } from 'redux'

import FriendshipsReducer from './friendships/friendshipsReducer'
import MembershipsReducer from './memberships/membershipsReducer'
import MessagesReducer from './messages/messagesReducer'
import ThreadsReducer from './threads/threadsReducer'
import TribesReducer from './tribes/tribeReducer'
import UsersReducer from './users/usersReducer'

const reducer = combineReducers({
  friendships: FriendshipsReducer,
  memberships: MembershipsReducer,
  messages: MessagesReducer,
  threads: ThreadsReducer,
  tribes: TribesReducer,
  users: UsersReducer,
})

export default reducer