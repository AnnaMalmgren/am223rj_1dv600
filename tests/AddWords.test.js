/**
* Module for testing class AddWords
* @module ./tests/AddWords.test.js
* @author am223rj
* @verion v1.0.0
*/
/* eslint-env jest */

const { AddWords } = require('../src/AddWords.js')

const sut = new AddWords()
test('should', () => {
  let expected = './data/words.json'
  let actual = sut.file
  expect(actual).toBe(expected)
})

test('should ', () => {
  let input = [[{ 'word': 'Wolf', 'clue': 'Animal that howls' }], 'Tiger', 'Animal with stripes']
  let expected = [{ 'word': 'Wolf', 'clue': 'Animal that howls' }, { 'word': 'Tiger', 'clue': 'Animal with stripes' }]
  let actual = sut.updateWord(input[0], input[1], input[2])
  expect(actual).toEqual(expected)
})

test('should ', () => {
  let input = [[{ 'word': 'Wolf', 'clue': 'Animal that howls' }]]
  let expected = [{ 'word': 'Wolf', 'clue': 'Animal that howls' }]
  let actual = sut.updateWord(input[0])
  expect(actual).toEqual(expected)
})
