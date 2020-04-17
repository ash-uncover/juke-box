/* Extracts the name of a function parameters
 * Courtesy of https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
 */
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
const ARGUMENT_NAMES = /([^\s,]+)/g
export const getParamNames = (func: any) => {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '')
  const result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
  if (result === null) {
    return []
  }
  return result
}