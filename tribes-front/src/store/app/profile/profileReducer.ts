import { Reducer } from 'redux'

import { ActionsTypes as ProfileActionsTypes} from './profileActions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/authActions'

export interface ProfileState {
  messageEdit: {
    threadId: string,
    messageId: string
  } | null,
}

export const getInitialState = () => ({
  messageEdit: null,
})
const initialState = getInitialState()

const reducer: Reducer<ProfileState> = (state = initialState, action) => {
  switch (action.type) {

    case ProfileActionsTypes.APP_PROFILE_THREAD_MESSAGE_EDIT: {
      const { threadId, messageId } = action.payload

      state.messageEdit = {
        threadId,
        messageId,
      }

      return { ...state }
    }

    case ProfileActionsTypes.APP_PROFILE_THREAD_MESSAGE_RELEASE: {
      state.messageEdit = null

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