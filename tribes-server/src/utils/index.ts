// UUID generator
// courtesy of https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript (answer #2)
export const UUID = {
  next: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}

export const decodeBasicHeader = (header = '') => {
  const encoded = header.split('Basic ').join('')
  const decoded = Buffer.from(encoded, 'base64').toString()
  const values = decoded.split(':')
  if (values.length === 2) {
    return {
      username: values[0],
      password: values[1]
    }
  } else {
    return {
      username: null,
      password: null
    }
  }
}
