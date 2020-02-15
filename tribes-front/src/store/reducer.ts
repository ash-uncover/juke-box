import { combineReducers } from 'redux'

import AuthReducer from './auth/reducer'
import RestReducer from './rest/reducer'

const reducer = combineReducers({
  auth: AuthReducer,
  rest: RestReducer
})

export default reducer