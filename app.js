/**
* The entrypoint of the application
* @module ./app.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'
const { Hangman } = require('./src/Hangman.js')
const hangman = new Hangman()
const chalk = require('chalk')

;(async () => {
  try {
    console.log(chalk.bold.blue('Welcome to Hangman! Enjoy your Game!\n'))
    await hangman.startGame()
  } catch (err) {
    console.log(err.message)
  }
})()
