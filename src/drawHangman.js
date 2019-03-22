/**
* Function to draw the hangman
* @module ./src/drawHangman.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'
/**
 * Updates the hangman drawing accordingly to nr of wrong guesses.
 *
 * @param {Number} nrOfWrongGuesses number of wrong guesses the player've made.
 */
function drawHangman (nrOfWrongGuesses) {
  const chalk = require('chalk')
  const hangmanStages = [
    `\n_____________`,
    `
    |
    |
    |
    |
    |
    |
    |_____________
    `,
    `
    |+---------+
    |
    |
    |
    |
    |
    |_____________
    `,
    `
    |+---------+
    |      |
    |
    |
    |
    |
    |_____________
    `,
    `
    |+---------+
    |      |
    |      O
    |
    |
    |
    |_____________
    `,
    `
    |+---------+
    |     |
    |     O
    |     |
    |
    |
    |_____________
    `,
    `
    |+---------+
    |     |
    |     O
    |     |/
    |
    |
    |_____________
    `,
    `
    |+---------+
    |     |
    |     O
    |    \\|/
    |
    |
    |_____________
    `,
    `
    |+---------+
    |     |
    |     O
    |    \\|/
    |      \\
    |
    |_____________
    `,
    `
    |+---------+
    |    |
    |    O
    |   \\|/
    |   / \\
    |
    |_____________
    `
  ]
  console.log(chalk.red(hangmanStages[nrOfWrongGuesses]))
}

module.exports.drawHangman = drawHangman
