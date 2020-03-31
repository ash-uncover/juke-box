export const socketSelector = (state: any) => state.socket

export const socketSessionSelector = (id: string) => ((state: any) => socketSelector(state)[id])
