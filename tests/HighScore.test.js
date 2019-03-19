/**
* Module for testing class HighScore
* @module ./tests/HighScore.test.js
* @author am223rj
* @verion v1.0.0
*/
/* eslint-env jest */

const { HighScore } = require('../src/HighScore.js')
const chalk = require('chalk')

const sut = new HighScore()

test('Should return "./data/highScore.json" as sut.file', async () => {
  await sut.checkHighScorePoints()

  let expected = './data/highScore.json'
  let actual = sut.file
  expect(actual).toEqual(expected)
})
