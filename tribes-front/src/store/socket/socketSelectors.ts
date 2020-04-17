export const socketSelector = (state: any) => state.socket

export const socketStatusSelector = (state: any) => socketSelector(state).status
export const socketUsersSelector = (state: any) => socketSelector(state).users

export const serverUserStatusSelector = (id: string) => ((state: any) => socketUsersSelector(state)[id])
