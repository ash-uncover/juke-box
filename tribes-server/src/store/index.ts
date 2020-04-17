import {
  createStore
} from 'redux'

import reducer from './reducer'

const store = createStore(reducer)

const dispatch = store.dispatch
store.dispatch = (action) => {
  if (action.type !== '@@SESSION/CHECK_SUCCESS') {
    console.log('--------------------------------------------')
    console.log(action)
  }
  const result = dispatch(action)
  if (action.type !== '@@SESSION/CHECK_SUCCESS') {
    console.log(JSON.stringify(store.getState(), null, 2))
  }
  return result
}

export default store
