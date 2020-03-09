import {
  toSet
} from '../../../src/utils/Sets'

describe('Sets', () => {

  describe('.toSets', () => {
    test('when sent an empty array', () => {
      const params = {
        array: []
      }
      const result = toSet(...Object.values(params))
      const expected = []

      expect(result).toEqual(expected)
    })
  })
})