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
test('Should return  [{name: Kim, points: 10}, {name: Anna, points: 15 }, {name: Bella, points: 30 }]', () => {
  let input = [{ 'name': 'Anna', 'points': 15 }, { 'name': 'Kim', 'points': 10 }, { 'name': 'Bella', 'points': 30 }]
  let expected = [{ 'name': 'Kim', 'points': 10 }, { 'name': 'Anna', 'points': 15 }, { 'name': 'Bella', 'points': 30 }]
  let actual = sut.sortHighScore(input)

  expect(actual).toEqual(expected)
})

test('Should return "[{ "name": "Kim", "points": 0 }, { "name": "Bella", "points": 25.76 }, { "name": "Anna", "points": 105 }]"', () => {
  let input = [{ 'name': 'Anna', 'points': 105 }, { 'name': 'Kim', 'points': 0 }, { 'name': 'Bella', 'points': 25.76 }]
  let expected = [{ 'name': 'Kim', 'points': 0 }, { 'name': 'Bella', 'points': 25.76 }, { 'name': 'Anna', 'points': 105 }]
  let actual = sut.sortHighScore(input)
  expect(actual).toEqual(expected)
})

// Tests method addAScore
test('Should return "[{ "name": "Niklas", "points": 20 }, { "name": "Anna", "points": 15 }]"', async () => {
  let input = [[{ 'name': 'Niklas', 'points': 20 }], 'Anna', 15]
  let expected = [{ 'name': 'Niklas', 'points': 20 }, { 'name': 'Anna', 'points': 15 }]
  let actual = await sut.addAScore(input[0], input[1], input[2])
  expect(actual).toEqual(expected)
})

test('Should return "[{ "name": "Niklas", "points": 20 }, { "name": null, "points": 0 }]"', async () => {
  let input = [[{ 'name': 'Niklas', 'points': 20 }], null, 0]
  let expected = [{ 'name': 'Niklas', 'points': 20 }, { 'name': null, 'points': 0 }]
  let actual = await sut.addAScore(input[0], input[1], input[2])
  expect(actual).toEqual(expected)
})

// Tests method updateJsonToBeSent
test('Should return [14, 20, 38]', async () => {
  let input = [[{ 'name': 'John', 'points': 14 }, { 'name': 'Niklas', 'points': 20 },
    { 'name': 'Harry', 'points': 38 }], 'Anna', 18]
  await sut.updateJsonToBeSent(input[0], input[1], input[2])
  let expected = [14, 20, 38]
  let actual = sut.pointsArr
  expect(actual).toEqual(expected)
})

test('Should return 2', async () => {
  let input = [[{ 'name': 'John', 'points': 14 }, { 'name': 'Niklas', 'points': 20 },
    { 'name': 'Harry', 'points': 38 }, { 'name': 'Emma', 'points': 15 }], 'Anna', 18]
  await sut.updateJsonToBeSent(input[0], input[1], input[2])
  let expected = 2
  let actual = sut.index
  expect(actual).toEqual(expected)
})

test('Should return "[ { "name": "John", "points": 14 }, { "name": "Niklas", "points": 20 }, { "name": "Anna", "points": 18 }]"', async () => {
  let input = [[{ 'name': 'John', 'points': 14 }, { 'name': 'Niklas', 'points': 20 },
    { 'name': 'Harry', 'points': 38 }], 'Anna', 18]
  let expected = [ { 'name': 'John', 'points': 14 }, { 'name': 'Niklas', 'points': 20 },
    { 'name': 'Anna', 'points': 18 }]
  let actual = await sut.updateJsonToBeSent(input[0], input[1], input[2])
  expect(actual).toEqual(expected)
})

// Tests method logHighScore
test('Should return "[\n1| John with result 14, \n2| Malin with result 19, \n3| Harry with result 38]"', async () => {
  let input = [{ 'name': 'John', 'points': 14 }, { 'name': 'Malin', 'points': 19 },
    { 'name': 'Harry', 'points': 38 }]
  let expected = ['\n1| John with result 14', '\n2| Malin with result 19', '\n3| Harry with result 38']
  let actual = await sut.logHighScore(input)
  expect(actual).toEqual(expected)
})

test('Should return "[\n1| John with result 0.4, \n2| Malin with result 38, \n3| Harry with result 100.48]"', async () => {
  let input = [{ 'name': 'John', 'points': 0.4 }, { 'name': 'Malin', 'points': 38 },
    { 'name': 'Harry', 'points': 100.48 }]
  let expected = ['\n1| John with result 0.4', '\n2| Malin with result 38', '\n3| Harry with result 100.48']
  let actual = await sut.logHighScore(input)
  expect(actual).toEqual(expected)
})
