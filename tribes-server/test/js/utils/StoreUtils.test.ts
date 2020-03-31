import {
  createStore
} from 'redux'

import * as StoreUtils from '../../../src/utils/StoreUtils'

/* TEST DATA */

const reducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'ACTION_TEST': return { data: 'test' }
    default: return state
  }
}

/* TEST CASES */

describe('StoreUtils', () => {
  describe('storeWatcher', () => {
    let store

    beforeEach(() => {
      store = createStore(reducer)
      store.dispatch({ type: '@@INIT' })
    })

    test('when an unknown action is emitted', () => {
      const paramPath = 'data'
      const paramCallback = jest.fn()

      StoreUtils.storeWatcher(store, paramPath, paramCallback)

      store.dispatch({ type: 'UNKNOWN_ACTION' })

      expect(paramCallback).not.toHaveBeenCalled()
    })

    test('when an known action is emitted', () => {
      const paramPath = 'data'
      const paramCallback = jest.fn()

      StoreUtils.storeWatcher(store, paramPath, paramCallback)

      store.dispatch({ type: 'ACTION_TEST' })

      expect(paramCallback).toHaveBeenCalled()
    })
  })
})
