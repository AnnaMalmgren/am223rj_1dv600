/**
* Module for class Hangman
* @module ./src/Hangman.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'
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
    this.message = 'Hello World'
  }
  startGame () {
    console.log(this.message)
  }
}

module.exports.Hangman = Hangman
