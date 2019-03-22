/**
* Module for class AddWords
* @module ./src/AddWords.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'

const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

/**
 * Class for AddWords
 * @class AddWords
 */
class AddWords {
  /**
   *Creates an instance of AddWords.
   * @memberof AddWords
   */
  constructor () {
    this.file = process.argv.slice(3, 4).toString() || path.join('./data', '/words.json')
  }

  /**
   * Updates the json from the words file with the word to add.
   *
   * @param {Object[]} json array with the word objects.
   * @param {String} word the word to be added
   * @param {String} clue the clue to be added
   * @returns {Object[]} The array with word objects updated with the word object to add.
   * @memberof AddWords
   */
  updateWord (json, word, clue) {
    let wordObj = { 'word': word, 'clue': clue }

    if (word && clue) {
      json.push(wordObj)
    }
    return json
  }

  /**
   * Adds the updates the words file with the newly added word.
   * @param {String} word the word to be added
   * @param {String} clue the clue to be added
   * @memberof AddWords
   */
  async addWord (word, clue) {
    await fs.readFile(this.file, async (err, data) => {
      if (err) {
        console.log(err.message)
      }
      let json = await JSON.parse(data)
      json = this.updateWord(json, word, clue)
      await fs.writeFile(this.file, JSON.stringify(json), err => {
        if (err) {
          console.log(err.message)
        } else {
          return console.log(chalk.bold.green('\nWord added succesfully.'))
        }
      })
    })
  }
}
module.exports.AddWords = AddWords
