import { combineReducers } from 'redux'

import AuthReducer from './auth/reducer'
import DataReducer from './data/reducer'

const reducer = combineReducers({
  auth: AuthReducer,
  data: DataReducer
})

export default reducer