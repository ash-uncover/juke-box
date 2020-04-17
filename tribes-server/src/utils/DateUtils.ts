export const dateString = (date: Date) => {
  const year = new String(date.getFullYear()).padStart(2, '0')
  const month = new String(date.getMonth()).padStart(2, '0')
  const day = new String(date.getDate()).padStart(2, '0')
  const hours = new String(date.getHours()).padStart(2, '0')
  const minutes = new String(date.getMinutes()).padStart(2, '0')
  const seconds = new String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const nowString = () => {
  return dateString(new Date(Date.now()))
}
