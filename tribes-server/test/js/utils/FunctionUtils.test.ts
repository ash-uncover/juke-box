import * as FunctionUtils from '../../../src/utils/FunctionUtils'

describe('FunctionUtils', () => {
  describe('getParamNames', () => {
    test('When function has no parameters', () => {
      const paramFn = () => {}
      const result = FunctionUtils.getParamNames(paramFn)
      const expected = []

      expect(result).toEqual(expected)
    })

    test('When function has some parameters', () => {
      const paramFn = (a, b) => {}
      const result = FunctionUtils.getParamNames(paramFn)
      const expected = ['a','b']

      expect(result).toEqual(expected)
    })
  })
})
