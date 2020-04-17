import { combineReducers } from 'redux'

import ProfileReducer from './profile/profileReducer'

const reducer = combineReducers({
  profile: ProfileReducer,
})

export default reducer