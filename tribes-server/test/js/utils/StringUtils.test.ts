import * as StringUtils from '../../../src/utils/StringUtils'

describe('StringUtils', () => {
  describe('capitalize', () => {
    test('With a lower case word', () => {
      expect(StringUtils.capitalize('test')).toEqual('Test')
    })
    test('With an upper case word', () => {
      expect(StringUtils.capitalize('TEST')).toEqual('Test')
    })
    test('With an mixed case word', () => {
      expect(StringUtils.capitalize('tEsT')).toEqual('Test')
    })
    test('With 1 letter string', () => {
      expect(StringUtils.capitalize('a')).toEqual('A')
    })
    test('With an empty string', () => {
      expect(StringUtils.capitalize('')).toEqual('')
    })
    test('With special chars', () => {
      expect(StringUtils.capitalize('*/+-')).toEqual('*/+-')
    })
  })

  describe('replaceAll', () => {
    test('Properly replace several occurrences', () => {
      const paramValue = 'bonjour test ca test bien'
      const paramPattern = 'test'
      const paramWith = 'stroumph'

      const result = StringUtils.replaceAll(paramValue, paramPattern, paramWith)

      const expected = 'bonjour stroumph ca stroumph bien'

      expect(result).toEqual(expected)
    })
  })
})
