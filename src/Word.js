/**
* Module for class Word
* @module ./src/Word.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'

/**
 * Class for Word
 * @class Word
 */
class Word {
  /**
   * Creates an instance of Word.
   * @memberof Word
   */
  constructor () {
    this.words = require(process.argv.slice(2).toString() || '../data/words.json')
    this.word = ''
    this.underScoreArr = []
    this.clue = ''
  }
  /**
   * Gets a randomly picked word to be used in the hangman game.
   * @returns {string} returns the word to be guessed
   * @memberof Word
   */
  getWord (index) {
    this.word = ''
    console.log(this.words)
    this.underScoreArr = []
    let randomWord = this.words[index]
    this.word = randomWord.word
    this.clue = randomWord.clue
    console.log(`\nYour clue: ${this.clue}`)
    this.setupWord()
    return this.word
  }
  /**
   * Creates the representaion of the word to be guessed.
   * @returns {String[]} returns an array consisting underscores.
   * @memberof Word
   */
  setupWord () {
    for (let i = 0; i < this.word.length; i++) {
      this.underScoreArr.push('_')
    }
    console.log('\n' + this.underScoreArr.join(' ') + '\n')
    return this.underScoreArr
  }
  /**
   * Resets the values for instances of Word.
   * @memberof Word
   */
  reset () {
    this.clue = ''
    this.word = ''
    this.underScoreArr = []
  }
}

module.exports.Word = Word
