import { combineReducers } from 'redux'

import MembershipsReducer from './memberships/reducer'
import TribesReducer from './tribes/reducer'
import UsersReducer from './users/reducer'

const reducer = combineReducers({
  memberships: MembershipsReducer,
  tribes: TribesReducer,
  useres: UsersReducer
})

export default reducer