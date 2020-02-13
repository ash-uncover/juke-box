import { Reducer, combineReducers } from 'redux'

import TribesReducer from './tribes/reducer'

const reducer = combineReducers({
  tribes: TribesReducer
})

export default reducer