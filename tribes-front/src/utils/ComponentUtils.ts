export const buildClassName = (main: string, ...add: any[]) => {
  let result = main
  if (add) {
    const actual = add.reduce((acc, item) => {
      if (item) {
        if (item && typeof item === 'string') {
          acc.push(item)
        }
      }
      return acc
    }, [])
    result += ` ${actual.join(' ')}`
  }
  return result
}