import { Reducer } from 'redux'

import { ActionsTypes } from './actions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/actions'
import { ActionsTypes as TribesActionsTypes } from '../tribes/actions'
import { ActionsTypes as UsersActionsTypes } from '../users/actions'

import {
  ErrorData,
  EventData,
} from '../../../types'

import { RequestState } from '../../../utils/constants'

export interface EventsState {
  data: any,
  status: RequestState,
  error: ErrorData | null,
}

export const getInitialState = () => ({
  data: {},
  status: RequestState.NEVER,
  error: null,
})
const initialState = getInitialState()

export interface EventState {
  data: EventData | null,
  status: RequestState,
  error: ErrorData | null,
}

export const initialEventState = () => ({
  data: null,
  status: RequestState.NEVER,
  error: null,
})

const getEventState = (state: EventsState, id: string) => {
  if (!state.data[id]) {
    state.data[id] = initialEventState()
  }
  return state.data[id]
}

const reducer: Reducer<EventsState> = (state = initialState, action) => {
  switch (action.type) {

    // GET /events/{tribeId}/events

    case TribesActionsTypes.REST_TRIBES_EVENTS_GETALL_SUCCESS: {
      const { events } = action.payload

      events.forEach((event: EventData) => {
        const eventState = getEventState(state, event.id)
        eventState.data = event
        eventState.error = null
        eventState.status = RequestState.SUCCESS
      })

      return { ...state }
    }


    // DELETE /auth

    case AuthActionsTypes.AUTH_DELETE_SUCCESS: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}

export default reducer