/**
* Module for class Hangman
* @module ./src/Hangman.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'
const { Word } = require('./Word.js')
const { Prompts } = require('./Prompts.js')

/**
 * Class for Hangman
 * @class Hangman
 */
class Hangman {
  /**
   *Creates an instance of Hangman.
   * @memberof Hangman
   */
  constructor () {
    this.prompts = new Prompts()
    this.guessedLetters = []
    this.guessesLeft = 9
    this.wordObj = new Word()
    this.word = ''
    this.seperate = '\n**************************************************************\n'
    this.quit = '.exit'
    this.response = false
  }
  /**
   * Starts the hangman game.
   * @memberof Hangman
   */
  async startGame () {
    this.reset()
    await this.prompts.promptMenu()
    if (this.prompts.startMenu) {
      let index = Math.floor(Math.random() * this.wordObj.words.length)
      this.word = this.wordObj.getWord(index)
      await this.playGame()
    } else {
      process.exit(0)
    }
  }
  /**
   * Contains the game logic for Hangman.
   * @memberof Hangman
   */
  async playGame () {
    await this.prompts.promptLetter()

    await this.checkLetterValue(this.prompts.letter)

    let log = `\nClue: ${this.wordObj.clue}\n\n${this.wordObj.underScoreArr.join(' ')}\nGuesses left: ${this.guessesLeft}
  Guessed Letters: ${this.guessedLetters}\nTo terminate write ${this.quit} and press enter.\n`

    console.log(log)

    this.updateStatus()
    return log
  }

  /**
   *  Checks what letter the user put in and updates the game accordingly.
   * @param {Object} letter the return Object after prompting user for letter.
   * @memberof Hangman
   */
  async checkLetterValue (letter) {
    if (letter === this.quit) {
      await this.prompts.confirmQuit()
      this.response = this.prompts.quit
    } else if (!letter.match(/[A-Z]/ig)) {
      console.log('You may only use letters a-z, try again.')
    } else if (this.guessedLetters.includes(letter)) {
      console.log(`You have already guessed "${letter}", try another letter.`)
    } else if (this.word.includes(letter)) {
      this.guessedLetters.push(letter)
      this.nrOfRightGuesses++
      let regex = new RegExp(`${letter}`, `ig`)
      let match = null
      while ((match = regex.exec(this.word)) !== null) {
        this.wordObj.underScoreArr[match.index] = letter
      }
    } else {
      this.guessedLetters.push(letter)
      this.guessesLeft--
    }
  }
  /**
   * Checks if the game is won, lost or should continue.
   * @memberof Hangman
   */
  async updateStatus () {
    if (this.wordObj.underScoreArr.indexOf('_') === -1) {
      console.log(`\nYou guessed the Word "${this.word}", congratulations you win!\n${this.seperate}`)
      this.startGame()
    } else if (this.guessesLeft === 0) {
      console.log(`\nGame Over\n${this.seperate}`)
      this.startGame()
    } else if (this.response) {
      console.log(`\nClosing down game... OK\n${this.seperate}`)
      this.startGame()
    } else {
      this.playGame()
    }
  }
  /**
   * Resets the values for instances of Hangman.
   * @memberof Hangman
   */
  reset () {
    this.response = false
    this.guessesLeft = 9
    this.guessedLetters = []
    this.word = ''
  }
}

module.exports.Hangman = Hangman
