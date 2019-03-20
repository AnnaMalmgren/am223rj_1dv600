/**
* Module for class Hangman
* @module ./src/Hangman.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'
const { Word } = require('./Word.js')
const { Prompts } = require('./Prompts.js')
const { Timer } = require('./Timer.js')
const { HighScore } = require('./HighScore.js')
const { AddWords } = require('./AddWords')
const logHangman = require('./drawHangman.js')
const chalk = require('chalk')

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
    this.wordObj = new Word()
    this.timer = new Timer()
    this.highScore = new HighScore()
    this.addWords = new AddWords()
    this.guessedLetters = []
    this.guessesLeft = 9
    this.word = ''
    this.seperate = '\n**************************************************************\n'
    this.quit = '.exit'
    this.response = false
    this.nickname = ''
    this.time = 0
    this.counter = 0
  }

  async promptNickname () {
    this.nickname = await this.prompts.promptNickName()
    if (this.nickname) {
      console.log(chalk.bold.green(`\nWelcome ${this.nickname}!\n`))
    } else {
      console.log(chalk.bold.red('\nYou need to enter a nickname.\n'))
      return this.promptNickname()
    }
  }
  /**
   * Starts the hangman game.
   * @memberof Hangman
   */
  async startGame () {
    this.reset()
    if (this.nickname === '') {
      await this.promptNickname()
    }
    await this.prompts.promptMenu()
    if (this.prompts.startMenu === 'Game Started') {
      let index = Math.floor(Math.random() * this.wordObj.words.length)
      this.word = this.wordObj.getWord(index)
      await this.playGame()
    } else if (this.prompts.startMenu === 'Shutting down...') {
      process.exit(0)
    } else if (this.prompts.startMenu === 'Add Word') {
      await this.prompts.addWord()
      await this.addWords.addWord(this.prompts.word, this.prompts.clue)
      this.startGame()
    }
  }
  /**
   * Contains the game logic for Hangman.
   * @memberof Hangman
   */
  async playGame () {
    this.timer.start()

    await this.prompts.promptLetter()

    await this.checkLetterValue(this.prompts.letter)

    let log = `\nClue: ${this.wordObj.clue}\n\n${this.wordObj.underScoreArr.join(' ')}\nGuesses left: ${this.guessesLeft}
Guessed Letters: ${this.guessedLetters}\nTo terminate write ${this.quit} and press enter.\n`

    console.log(log)

    this.updateStatus()
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
      console.log(chalk.bold.red('You may only use letters a-z, try again.'))
    } else if (this.guessedLetters.includes(letter)) {
      console.log(chalk.bold.red(`You have already guessed "${letter}", try another letter.`))
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
      this.counter++
    }
    logHangman.drawHangman(this.counter)
  }
  /**
   * Checks if the game is won, lost or should continue.
   * @memberof Hangman
   */
  async updateStatus () {
    if (this.wordObj.underScoreArr.indexOf('_') === -1) {
      this.time = this.timer.stop()
      console.log(chalk.bold.green(`\nYou guessed the Word "${this.word}", congratulations you win!\n${this.seperate}`))
      await this.highScore.checkHighScorePoints(this.nickname, this.time)

      await this.prompts.promptHighScore()
      if (this.prompts.highScoreList) {
        console.log(this.seperate)
        await this.highScore.highScoreView()
        await this.startGame()
      } else {
        this.startGame()
      }
    } else if (this.guessesLeft === 0) {
      this.timer.stop()
      console.log(chalk.bold.red(`\nGame Over\n${this.seperate}`))
      this.startGame()
    } else if (this.response) {
      console.log(chalk.green(`\nClosing down game... OK\n${this.seperate}`))
      this.timer.stop()
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
    this.counter = 0
  }
}

module.exports.Hangman = Hangman
