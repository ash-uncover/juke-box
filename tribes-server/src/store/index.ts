import {
  createStore
} from 'redux'

import reducer from './reducer'

const store = createStore(reducer)

store.dispatch = (action) => {
  console.log('--------------------------------------------')
  console.log(action)
  const result = store.dispatch(action)
  console.log(store.getState())
  return result
}

export default store
