export const authSelector = (state: any) => state.auth

export const authStateSelector = (state: any) => authSelector(state).authState
export const authTokenSelector = (state: any) => authSelector(state).authToken
export const authErrorSelector = (state: any) => authSelector(state).authError
export const authUsernameSelector = (state: any) => authSelector(state).authUsername
export const authUserSelector = (state: any) => authSelector(state).authUser