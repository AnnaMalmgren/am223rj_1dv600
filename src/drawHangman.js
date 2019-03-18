
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
