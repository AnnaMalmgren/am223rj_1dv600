/**
* Module for testing function drawHangman
* @module ./tests/drawHangman.test.js
* @author am223rj
* @verion v1.0.0
*/
/* eslint-env jest */

const sut = require('../src/drawHangman.js')
const chalk = require('chalk')

let outputData = ''
let storeLog = inputs => (outputData += inputs)

test('Should return "chalk.red(`\n_____________`)"', () => {
  outputData = ''
  console['log'] = jest.fn(storeLog)

  let input = 0
  let expected = chalk.red(`\n_____________`)
  sut.drawHangman(input)
  expect(outputData).toEqual(expected)
})

test('Should return fully drawned hangman"', () => {
  outputData = ''
  console['log'] = jest.fn(storeLog)

  let input = 9
  sut.drawHangman(input)
  let hangman =
    `
    |+---------+
    |    |
    |    O
    |   \\|/
    |   / \\
    |
    |_____________
    `

  let expected = chalk.red(hangman)

  expect(outputData).toEqual(expected)
})
