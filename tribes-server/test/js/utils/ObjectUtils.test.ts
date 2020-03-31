import * as ObjectUtils from '../../../src/utils/ObjectUtils'

describe('ObjectUtils', () => {
  describe('getProperty', () => {
    test('basic object and 1 level depth', () => {
      const paramObject = { member: 'data' }
      const paramPath = 'member'
      const result = ObjectUtils.getProperty(paramObject, paramPath)
      const expected = 'data'

      expect(result).toEqual(expected)
    })

    test('complex object and 3 level depth', () => {
      const paramObject = {
        level1: { level2: { level3: '13' } },
        level2: { level3: '23' },
        level3: '33',
      }
      const paramPath = 'level1.level2'
      const result = ObjectUtils.getProperty(paramObject, paramPath)
      const expected = { level3: '13' }

      expect(result).toEqual(expected)
    })
  })
})
