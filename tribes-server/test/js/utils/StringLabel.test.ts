import StringLabel from '../../../src/utils/StringLabel'

/* TEST CASES */

describe('StringLabel', () => {

  function checkOneWord(label) {
    expect(label.words).toEqual(['word'])
    expect(label.camel).toEqual('word')
    expect(label.pascal).toEqual('Word')
    expect(label.worm).toEqual('word')
    expect(label.snake).toEqual('Word')
    expect(label.serpent).toEqual('WORD')
  }
  function checkTwoWords(label) {
    expect(label.words).toEqual(['word1','word2'])
    expect(label.camel).toEqual('word1Word2')
    expect(label.pascal).toEqual('Word1Word2')
    expect(label.worm).toEqual('word1_word2')
    expect(label.snake).toEqual('Word1_Word2')
    expect(label.serpent).toEqual('WORD1_WORD2')
  }
  function checkEmpty(label) {
    expect(label.words).toEqual([])
    expect(label.camel).toEqual('')
    expect(label.pascal).toEqual('')
    expect(label.worm).toEqual('')
    expect(label.snake).toEqual('')
    expect(label.serpent).toEqual('')
  }

  describe('Words', () => {

    test('With 1 word', () => {
      checkOneWord(new StringLabel('word', '_'))
    })

    test('With 2 words', () => {
      checkTwoWords(new StringLabel('word1_word2', '_'))
    })

    test('With starting separators', () => {
      checkTwoWords(new StringLabel('word1__word2', '_'))
    })

    test('With two consecutive separators', () => {
      checkTwoWords(new StringLabel('_word1_word2', '_'))
    })

    test('With closing separators', () => {
      checkTwoWords(new StringLabel('word1_word2_', '_'))
    })

    test('With empty string', () => {
      checkEmpty(new StringLabel('', '_'))
    })

    test('With only separator', () => {
      checkEmpty(new StringLabel('_', '_'))
    })

    test('With default separator', () => {
      checkTwoWords(new StringLabel('word1 word2'))
    })
  })
})
