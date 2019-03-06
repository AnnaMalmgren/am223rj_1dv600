
const { Hangman } = require('../src/Hangman.js')
const sut = new Hangman()
let outputData = ''
storeLog = inputs => (outputData += inputs)

// checkLetterValue tests
test('sut.guessedLetters should conatin "a"', async () => {
  await sut.checkLetterValue('a')
  expect(sut.guessedLetters).toContain('a')
})

test('Should log "You have already guessed "a", try another letter."', async () => {
  outputData = ''
  console['log'] = jest.fn(storeLog)
  await sut.checkLetterValue('a')
  expect(outputData).toBe(`You have already guessed "a", try another letter.`)
})

test('Should set nrOfRightGuesses to 1', async () => {
  sut.word = 'javascript'
  sut.nrOfRightGuesses = 0
  sut.guessedLetters = []
  await sut.checkLetterValue('a')
  expect(sut.nrOfRightGuesses).toBe(1)
})

test('Should set underscoreArr to [_, a, _, a, _, _, _, _, _, _]' , async () => {
  sut.word = 'javascript'
  sut.guessedLetters = []
  sut.wordObj.underScoreArr = ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_']
  await sut.checkLetterValue('a')
  expect(sut.wordObj.underScoreArr).toEqual(['_', 'a', '_', 'a', '_', '_', '_', '_', '_', '_'])
})

test('Should set guessesLeft to 8', async () => {
  sut.word = 'javascript'
  sut.guessesLeft = 9
  sut.guessedLetters = []
  await sut.checkLetterValue('f')
  expect(sut.guessesLeft).toBe(8)
})

test('guessedLetters should contain F', async () => {
  sut.word = 'javascript'
  sut.guessedLetters = []
  await sut.checkLetterValue('f')
  expect(sut.guessedLetters).toContain('f')
})

test('Should log "You may only use letters a-z, try again."', async () => {
  outputData = ''
  console['log'] = jest.fn(storeLog)
  await sut.checkLetterValue('1')
  expect(outputData).toBe('You may only use letters a-z, try again.')
})

// updateStatus tests
test('Should log "You guessed the Word "javascript", congratulations you win!"', () => {
  sut.wordObj.underScoreArr = ['j', 'a', 'v', 'a', 's', 'c', 'r', 'i', 'p', 't']
  outputData = ''
  console['log'] = jest.fn(storeLog)
  sut.updateStatus()
  expect(outputData).toBe(`\nYou guessed the Word "javascript", congratulations you win!\n${sut.seperate}`)
})

test('Should log "Game Over"', () => {
  sut.wordObj.underScoreArr = ['_']
  sut.guessesLeft = 0
  outputData = ''
  console['log'] = jest.fn(storeLog)
  sut.updateStatus()
  expect(outputData).toBe(`\nGame Over\n${sut.seperate}`)
})

test('Should log "Closing down game...OK"', () => {
  sut.wordObj.underScoreArr = ['_']
  sut.response = true
  outputData = ''
  console['log'] = jest.fn(storeLog)
  sut.updateStatus()
  expect(outputData).toBe(`\nClosing down game... OK\n${sut.seperate}`)
})


// reset tests
test('Should response to be false', () => {
  sut.reset(
    expect(sut.response).toBeFalsy()
  )
})

test('Should set guessedLetters to []', () => {
  sut.reset(
    expect(sut.guessedLetters).toEqual([])
  )
})

test('Should set guessesLeft to 9', () => {
  sut.reset(
    expect(sut.guessesLeft).toBe(9)
  )
})

test('Should set word to be ""', () => {
  sut.reset(
    expect(sut.word).toBeFalsy()
  )
})
