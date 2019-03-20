/**
* Module for class Prompts
* @module ./src/Prompts.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'
/**
 * Class for Prompts
 * @class Prompts
 */
class Prompts {
  /**
   *Creates an instance of Pompts.
   * @memberof Prompts
   */
  constructor () {
    this.prompts = require('prompts')
    this.letter = ''
    this.startMenu = ''
    this.quit = ''
    this.highScoreList = ''
    this.word = ''
    this.clue = ''
  }

  async promptNickName () {
    let nickName = await this.prompts([{
      type: 'text',
      message: 'Enter your nickname',
      name: 'value'
    }])
    return nickName.value
  }

  /**
    * Prompts to enter a letter and reads the user input using package prompts.
    * @memberof Prompts
    * @return {string} returns the user input as a string
    */
  async promptLetter () {
    let letter = await this.prompts([{
      type: 'text',
      message: 'Enter a letter',
      name: 'value'
    }])
    this.letter = letter.value
    return letter.value
  }

  /**
   * Shows main menu, prompts to confirm start new game using package prompts.
   * @memberof Prompts
   * @return {boolean}
   */
  async promptMenu () {
    let startMenu = await this.prompts({
      type: 'select',
      name: 'value',
      message: 'What do you want to do?',
      choices: [
        { title: 'Start Game', value: 'Game Started' },
        { title: 'Quit', value: 'Shutting down...' },
        { title: 'Add a word to the game', value: 'Add Word' }
      ],
      initial: 0
    })
    this.startMenu = startMenu.value
    return startMenu.value
  }

  /**
   * Prompts the user to confirm if he/she wants to see the high score.
   * @memberof Prompts
   * @return {boolean}
   */
  async promptHighScore () {
    let highScore = await this.prompts({
      type: 'confirm',
      name: 'value',
      message: 'Du you want to view the high score?',
      initial: true
    })
    this.highScoreList = highScore.value
    return highScore.value
  }

  /**
   * Prompts to confirm quit game using package prompts.
   * @memberof Prompts
   * @return {boolean}
   */
  async confirmQuit () {
    let quit = await this.prompts({
      type: 'confirm',
      name: 'value',
      message: 'Are you sure you want to quit?',
      initial: false
    })
    this.quit = quit.value
    return quit.value
  }

  async addWord () {
    let questions = [
      {
        type: 'text',
        name: 'word',
        message: 'What word do you want to add?'
      },
      {
        type: 'text',
        name: 'clue',
        message: 'Add a clue for that word'
      }
    ]
    let wordObj = await this.prompts(questions)
    this.word = wordObj.word
    this.clue = wordObj.clue
  }
}

module.exports.Prompts = Prompts
