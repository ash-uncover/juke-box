import {
  toSet,
  add,
  remove,
  merge,
} from '../../../src/utils/Sets'

describe('Sets', () => {

  describe('toSets', () => {
    test('when sent an empty array', () => {
      const paramArray = []
      const result = toSet(paramArray)
      const expected = []

      expect(result).toEqual(expected)
    })

    test('when sent a simple array', () => {
      const paramArray = ['a', 'b']
      const result = toSet(paramArray)
      const expected = ['a', 'b']

      expect(result).toEqual(expected)
    })

    test('when sent an array with dupplication', () => {
      const paramArray = ['a', 'b', 'a']
      const result = toSet(paramArray)
      const expected = ['a', 'b']

      expect(result).toEqual(expected)
    })
  })

  describe('add', () => {
    test('when adding an element', () => {
      const paramSet = ['a']
      const paramElement = 'b'
      const result = add(paramSet, paramElement)
      const expected = ['a', 'b']

      expect(result).toEqual(expected)
    })

    test('when adding several element', () => {
      const paramSet = ['a']
      const paramElement1 = 'b'
      const paramElement2 = 'c'
      const result = add(paramSet, paramElement1, paramElement2)
      const expected = ['a', 'b', 'c']

      expect(result).toEqual(expected)
    })

    test('when adding an element already in set', () => {
      const paramSet = ['a']
      const paramElement = 'a'
      const result = add(paramSet, paramElement)
      const expected = ['a']

      expect(result).toEqual(expected)
    })

    test('when adding duplicated element', () => {
      const paramSet = ['a']
      const paramElement1 = 'b'
      const paramElement2 = 'b'
      const result = add(paramSet, paramElement1, paramElement2)
      const expected = ['a', 'b']

      expect(result).toEqual(expected)
    })
  })

  describe('remove', () => {
    test('when removing an existing element', () => {
      const paramSet = ['a']
      const paramElement = 'a'
      const result = remove(paramSet, paramElement)
      const expected = []

      expect(result).toEqual(expected)
    })

    test('when removing several elements', () => {
      const paramSet = ['a', 'b', 'c']
      const paramElement1 = 'a'
      const paramElement2 = 'c'
      const result = remove(paramSet, paramElement1, paramElement2)
      const expected = ['b']

      expect(result).toEqual(expected)
    })

    test('when removing a missing element', () => {
      const paramSet = ['a', 'b']
      const paramElement = 'c'
      const result = remove(paramSet, paramElement)
      const expected = ['a', 'b']

      expect(result).toEqual(expected)
    })

    test('when removing sevaral elements including some missing', () => {
      const paramSet = ['a', 'b']
      const paramElement1 = 'c'
      const paramElement2 = 'b'
      const paramElement3 = 'd'
      const result = remove(paramSet, paramElement1, paramElement2, paramElement3)
      const expected = ['a']

      expect(result).toEqual(expected)
    })
  })

  describe('merge', () => {
    test('when merging distinct arrays', () => {
      const paramSet1 = ['a', 'b']
      const paramSet2 = ['c', 'd']
      const result = merge(paramSet1, paramSet2)
      const expected = ['a', 'b', 'c', 'd']

      expect(result).toEqual(expected)
    })

    test('when merging arrays with same values', () => {
      const paramSet1 = ['a', 'b']
      const paramSet2 = ['c', 'a']
      const result = merge(paramSet1, paramSet2)
      const expected = ['a', 'b', 'c']

      expect(result).toEqual(expected)
    })
  })
})


