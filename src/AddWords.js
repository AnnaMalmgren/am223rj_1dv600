'use strict'
const fs = require('fs')
const chalk = require('chalk')

class AddWords {
  constructor () {
    this.file = './data/words.json'
  }
  async addWord (word, clue) {
    await fs.readFile(this.file, async (err, data) => {
      if (err) {
        console.log(err.message)
      }
      let json = await JSON.parse(data)
      let wordObj = { 'word': word, 'clue': clue }
      json.push(wordObj)
      await fs.writeFile(this.file, JSON.stringify(json), err => {
        if (err) {
          console.log(err.message)
        } else {
          console.log(chalk.bold.green('Word added succesfully.'))
        }
      })
    })
  }
}
module.exports.AddWords = AddWords
