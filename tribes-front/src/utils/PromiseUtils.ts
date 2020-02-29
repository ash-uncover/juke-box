const DELAY = 0

export const delayedPromise = (promise: any, timeout: number = DELAY) => {
  return Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, timeout))
  ])
    .then((result) => {
      return result[0]
    })
    .catch((error) => {
      throw error
    })
}
