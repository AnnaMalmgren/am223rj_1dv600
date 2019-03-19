/**
* The entrypoint of the application
* @module ./app.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'
const { Hangman } = require('./src/Hangman.js')
const hangman = new Hangman()
const exit = require('./lib/exit.js')
const chalk = require('chalk')

exit.handleCtrlC()
process.on('exit', () => {
  console.log('\nShutting down app... OK\n')
})

;(async () => {
  try {
    console.log(chalk.bold.blue('Welcome to Hangman! Enjoy your Game!\n'))
    await hangman.startGame()
  } catch (err) {
    console.log(err.message)
  }
})()
