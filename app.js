/**
* The entrypoint of the application
* @module ./app.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'

const { Hangman } = require('./src/Hangman.js')
const hangman = new Hangman()

hangman.startGame()
