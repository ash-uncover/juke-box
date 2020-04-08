import {
  combineReducers
} from 'redux'

import MessagesReducer from './messages/messagesReducer'
import ThreadsReducer from './threads/threadsReducer'
import TribesReducer from './tribes/tribesReducer'
import UsersReducer from './users/usersReducer'

const reducer = (
  state = {
    messages: undefined,
    threads: undefined,
    tribes: undefined,
    users: undefined,
  },
  action,
  rootState,
) => ({
  messages: MessagesReducer(state.messages, action, rootState),
  threads: ThreadsReducer(state.threads, action, rootState),
  tribes: TribesReducer(state.tribes, action, rootState),
  users: UsersReducer(state.users, action, rootState),
})

export default reducer