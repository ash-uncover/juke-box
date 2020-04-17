import {
  SessionModel
} from '../../types'

export const sessionsSelector = (state) => state.sessions

export const isLastSession = (state, userId, sessionId) => {
  const sessions = sessionsSelector(state)
  const userSessions = Object.values(sessions).filter((session: SessionModel) => {
    return session.userId === userId
  })
  return (
    userSessions.length === 0 ||
    (userSessions.length === 1 && userSessions.some((session: SessionModel) => session.id === sessionId))
  )
}