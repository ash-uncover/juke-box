export const socketSelector = (state: any) => state.socket

export const socketStatusSelector = (state: any) => socketSelector(state).status