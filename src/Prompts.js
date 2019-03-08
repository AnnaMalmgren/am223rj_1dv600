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
      type: 'confirm',
      name: 'value',
      message: 'Start new round of Hangman?',
      initial: true
    })
    this.startMenu = startMenu.value
    return startMenu.value
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
}

module.exports.Prompts = Prompts