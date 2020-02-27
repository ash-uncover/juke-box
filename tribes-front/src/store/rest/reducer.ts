import { combineReducers } from 'redux'

import FriendshipsReducer from './friendships/friendshipsReducer'
import MembershipsReducer from './memberships/membershipsReducer'
import ThreadsReducer from './threads/threadsReducer'
import TribesReducer from './tribes/tribeReducer'
import UsersReducer from './users/usersReducer'

const reducer = combineReducers({
  friendships: FriendshipsReducer,
  memberships: MembershipsReducer,
  threads: ThreadsReducer,
  tribes: TribesReducer,
  users: UsersReducer,
})

export default reducer