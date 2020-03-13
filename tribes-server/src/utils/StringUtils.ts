export const capitalize = (value: string) => {
  if (value.length) {
    return value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase()
  }
  return ''
}

export const replaceAll = (value: string, replacePattern: string, replaceWith: string) => {
  return value.split(replacePattern).join(replaceWith)
}