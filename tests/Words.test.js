/**
* Module for testing class Word
* @module ./tests/word.test.js
* @author am223rj
* @verion v1.0.0
*/
/* eslint-env jest */

const { Word } = require('../src/Word.js')
const sut = new Word()

// Test method getWord

test('Should return word "javascript"', () => {
  let input = 0
  let expected = 'javascript'
  let actual = sut.getWord(input)
  expect(actual).toBe(expected)
})

test('Should set clue to "A programming language"', () => {
  let input = 0
  sut.getWord(input)
  let expected = 'A programming language'
  let actual = sut.clue
  expect(actual).toBe(expected)
})

test('Should return word "chrome"', () => {
  let input = 3
  let expected = 'chrome'
  let actual = sut.getWord(input)
  expect(actual).toBe(expected)
})

test('Should set clue to "A browser"', () => {
  let input = 3
  sut.getWord(input)
  let expected = 'A browser'
  let actual = sut.clue
  expect(actual).toBe(expected)
})

// Tests method setupWord

test('Should return an array with ten underscores', () => {
  sut.underScoreArr = []
  sut.word = 'javascript'

  let expected = ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_']
  let actual = sut.setupWord()
  expect(actual).toEqual(expected)
})

test('Should return an array with six underscores', () => {
  sut.underScoreArr = []
  sut.word = 'chrome'

  let expected = ['_', '_', '_', '_', '_', '_']
  let actual = sut.setupWord()
  expect(actual).toEqual(expected)
})

// Tests method reset.
test('Should reset clue to "" ', () => {
  sut.reset()
  let expected = ''
  let actual = sut.clue
  expect(actual).toBe(expected)
})

test('Should reset word to "" ', () => {
  sut.reset()
  let expected = ''
  let actual = sut.word
  expect(actual).toBe(expected)
})

test('Should reset clue to [] ', () => {
  sut.reset()
  let expected = []
  let actual = sut.underScoreArr
  expect(actual).toEqual(expected)
})
