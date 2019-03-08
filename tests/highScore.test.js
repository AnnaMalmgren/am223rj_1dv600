
/**
* Module for testing class HighScore
* @module ./tests/HighScore.test.js
* @author am223rj
* @verion v1.0.0
*/
/* eslint-env jest */

const { HighScore } = require('../src/HighScore.js')
const sut = new HighScore()

// Tests method sortHighScore
test('sorts the highgscores descending, should return [7, 5, 3]', () => {
  let expected = [7, 5, 3]
  let actual = sut.sortHighScore()
  expect(actual).toEqual(expected)
})
