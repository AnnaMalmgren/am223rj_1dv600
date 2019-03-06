

const { Word } = require('../src/Word.js')
const sut = new Word()

test('Should return word "javascript"', () => {
  let expected = 'javascript'
  expect(sut.getWord(0)).toBe(expected)
})

test('Should set clue to "A programming language"', () => {
  sut.index = 0
  let expected = 'A programming language'
  expect(sut.clue).toBe(expected)
})

test('Should return word "chrome"', () => {
  let expected = 'chrome'
  expect(sut.getWord(3)).toBe(expected)
})

test('Should set clue to "A browser"', () => {
  sut.index = 3
  let expected = 'A browser'
  expect(sut.clue).toBe(expected)
})

test('Should return an array with ten underscores', () => {
  sut.underScoreArr = []
  sut.word = 'javascript'
  let expected = ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_']
  expect(sut.setupWord()).toEqual(expected)
})

test('Should return an array with six underscores', () => {
  sut.underScoreArr = []
  sut.word = 'chrome'
  let expected = ['_', '_', '_', '_', '_', '_']
  expect(sut.setupWord()).toEqual(expected)
})

test('Should reset clue to "" ', () => {
  let expected = ''
  sut.reset()
  expect(sut.clue).toBe(expected)
})

test('Should reset word to "" ', () => {
  let expected = ''
  sut.reset()
  expect(sut.word).toBe(expected)
})

test('Should reset clue to [] ', () => {
  let expected = []
  sut.reset()
  expect(sut.underScoreArr).toEqual(expected)
})
