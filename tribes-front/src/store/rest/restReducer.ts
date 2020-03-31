import { combineReducers } from 'redux'

import EventsReducer from './events/eventsReducer'
import FriendshipsReducer from './friendships/friendshipsReducer'
import MembershipsReducer from './memberships/membershipsReducer'
import MessagesReducer from './messages/messagesReducer'
import ThreadsReducer from './threads/threadsReducer'
import TribesReducer from './tribes/tribesReducer'
import UsersReducer from './users/usersReducer'

const reducer = combineReducers({
  events: EventsReducer,
  friendships: FriendshipsReducer,
  memberships: MembershipsReducer,
  messages: MessagesReducer,
  threads: ThreadsReducer,
  tribes: TribesReducer,
  users: UsersReducer,
})

export default reducer