import { Reducer } from 'redux'
import { TribeData } from '../../../types'

export interface TribesState {
  tracks: Array<TribeData>
}

export const initialState: TribesState = {
  tribes: [
    {}
  ]
}

const reducer: Reducer<TribesState> = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export default reducer