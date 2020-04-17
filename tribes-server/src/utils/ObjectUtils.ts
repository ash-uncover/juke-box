export const getProperty = (object: object, path: string) => {
  return path.split('.').reduce((acc, element) => {
    if (acc && typeof acc === 'object') {
      return acc[element]
    }
    return undefined
  }, object)
}
