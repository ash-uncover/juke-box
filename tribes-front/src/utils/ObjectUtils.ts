export const clone = (object: any) => {
  return JSON.parse(JSON.stringify(object))
}