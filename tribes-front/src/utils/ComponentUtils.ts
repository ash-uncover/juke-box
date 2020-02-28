export const buildClassName = (main: string, add: string | Array<string> | undefined) => {
  let result = main
  if (add) {
    if (typeof add === 'string') {
      result += ` ${add}`
    } else {
      result += ` ${add.join(' ')}`
    }
  }
  return result
}