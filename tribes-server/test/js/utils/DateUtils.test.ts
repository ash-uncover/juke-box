import * as DateUtils from '../../../src/utils/DateUtils'

describe('DateUtils', () => {
  describe('dateString', () => {
    test('When send a valid date', () => {
      const paramDate = new Date(2005, 1, 25)
      const result = DateUtils.dateString(paramDate)
      const expected = '2005-01-25 00:00:00'

      expect(result).toEqual(expected)
    })
  })

  describe('nowString', () => {
    test('returns something', () => {
      const result = DateUtils.nowString()
      expect(result).toBeDefined()
    })
  })
})
