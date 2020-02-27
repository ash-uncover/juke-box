import { combineReducers } from 'redux'

import FriendshipsReducer from './friendships/reducer'
import MembershipsReducer from './memberships/reducer'
import TribesReducer from './tribes/reducer'
import UsersReducer from './users/reducer'

const reducer = combineReducers({
  friendships: FriendshipsReducer,
  memberships: MembershipsReducer,
  tribes: TribesReducer,
  users: UsersReducer,
})

export default reducer