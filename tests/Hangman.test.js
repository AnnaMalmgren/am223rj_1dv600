/**
* Module for testing class Hangman
* @module ./tests/hangman.test.js
* @author am223rj
* @verion v1.0.0
*/
/* eslint-env jest */

const { Hangman } = require('../src/Hangman.js')
const chalk = require('chalk')


const sut = new Hangman()

let outputData = ''
storeLog = inputs => (outputData += inputs)

// Tests for method checkLetterValue

test('sut.guessedLetters should conatin "a"', async () => {
  let input = 'a'
  await sut.checkLetterValue(input)
  let expected = 'a'
  let actual = sut.guessedLetters
  expect(actual).toContain(expected)
})

test('Should log "You have already guessed "a", try another letter." and "_____________"`' , async () => {
  outputData = ''
  console['log'] = jest.fn(storeLog)
  sut.counter = 0

  let input = 'a'
  await sut.checkLetterValue(input)
  let expected = chalk.bold.red(`You have already guessed "a", try another letter.`) + chalk.red(`\n_____________`)
  expect(outputData).toBe(expected)
})

test('Should set nrOfRightGuesses to 1', async () => {
  sut.word = 'javascript'
  sut.nrOfRightGuesses = 0
  sut.guessedLetters = []

  let input = 'a'
  await sut.checkLetterValue(input)
  let expected = 1
  let actual = sut.nrOfRightGuesses
  expect(actual).toBe(expected)
})

test('Should set underscoreArr to [_, a, _, a, _, _, _, _, _, _]' , async () => {
  sut.guessedLetters = []
  sut.wordObj.underScoreArr = ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_']

  let input = 'a'
  await sut.checkLetterValue(input)
  let expected = ['_', 'a', '_', 'a', '_', '_', '_', '_', '_', '_']
  let actual = sut.wordObj.underScoreArr
  expect(actual).toEqual(expected)
})

test('Should set guessesLeft to 8', async () => {
  sut.word = 'javascript'
  sut.guessesLeft = 9
  sut.guessedLetters = []

  let input = 'f'
  await sut.checkLetterValue(input)
  let expected = 8
  let actual = sut.guessesLeft
  expect(actual).toBe(expected)
})

test('guessedLetters should contain F', async () => {
  sut.word = 'javascript'
  sut.guessedLetters = []

  let input = 'f'
  await sut.checkLetterValue(input)
  let expected = 'f'
  let actual = sut.guessedLetters
  expect(actual).toContain(expected)
})

test('Should log "You may only use letters a-z, try again."', async () => {
  outputData = ''
  console['log'] = jest.fn(storeLog)
  sut.counter = 0

  let input = '1'
  await sut.checkLetterValue(input)
  let expected = chalk.bold.red('You may only use letters a-z, try again.') + chalk.red(`\n_____________`)
  expect(outputData).toBe(expected)
})

// Tests for method updateStatus

test('Should log "You guessed the Word "javascript", congratulations you win!"', () => {
  outputData = ''
  console['log'] = jest.fn(storeLog)

  sut.wordObj.underScoreArr = ['j', 'a', 'v', 'a', 's', 'c', 'r', 'i', 'p', 't']

  sut.updateStatus()
  let expected = chalk.bold.green(`\nYou guessed the Word "javascript" in 0.0 seconds, congratulations you win!\n${sut.seperate}`)
  expect(outputData).toBe(expected)
})

test('Should log "Game Over"', () => {
  outputData = ''
  console['log'] = jest.fn(storeLog)

  sut.wordObj.underScoreArr = ['_']
  sut.guessesLeft = 0
 
  sut.updateStatus()
  let expected = chalk.bold.red(`\nGame Over\n${sut.seperate}`)
  expect(outputData).toBe(expected)
})

test('Should log "Closing down game...OK"', () => {
  outputData = ''
  console['log'] = jest.fn(storeLog)

  sut.wordObj.underScoreArr = ['_']
  sut.response = true
  
  sut.updateStatus()
  let expected = chalk.green(`\nClosing down game... OK\n${sut.seperate}`)
  expect(outputData).toBe(expected)
})

// Tests for reset method.

test('Should set response to be false', () => {
  sut.reset()
  let actual = sut.response
  expect(actual).toBeFalsy()
  
})

test('Should set guessedLetters to []', () => {
  sut.reset()
  let expected = []
  let actual = sut.guessedLetters
  expect(actual).toEqual(expected)
})

test('Should set guessesLeft to 9', () => {
  sut.reset()
  let expected = 9
  let actual = sut.guessesLeft
  expect(actual).toBe(expected)
  
})

test('Should set word to be ""', () => {
  sut.reset()
  let actual = sut.word
  expect(actual).toBeFalsy() 
})