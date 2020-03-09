export const toSet = (array) => {
  return array.reduce((acc, element) => {
    if (acc.includes(element)) {
      acc.push(element)
    }
    return acc
  }, [])
}

export const add = (set, ...elements) => {
  elements.forEach((element) => {
    if (!set.includes(element)) {
      set.push(element)
    }
  })
  return set
}

export const remove = (set, ...elements) => {
  elements.forEach((element) => {
    const index = set.indexOf(element)
    if (index !== -1) {
      set.splice(index, 1)
    }
  })
  return set
}

export const merge = (set1, set2) => {
  return toSet(set1.concat(set2))
}
