/**
* Module for class HighScore
* @module ./src/HighScore.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'
const { Hangman } = require('./Hangman.js')

class HighScore {
  constructor () {
    this.hangman = new Hangman()
    this.highscoreData = (require('../data/highScore.json'))
  }

  sortHighScore () {
    let result = []
    this.highscoreData.map(obj => result.push(obj.guessesLeft))
    // result.sort((a, b) => b - a)
    result.sort()
    return result
  }
}

module.exports.HighScore = HighScore
