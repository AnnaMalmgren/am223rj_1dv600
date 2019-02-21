/**
 * Module for exit functions.
 * @module ./lib/exit.js
 * @author am223rj
 * @version v1.0.0
 */

'use strict'

/**
 * Handles the ctrl c command so that process will exit on it.
 */
function handleCtrlC () {
  if (process.platform === 'win32') {
    var rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.on('SIGINT', function () {
      process.emit('SIGINT')
    })
  }

  process.on('SIGINT', function () {
    process.exit()
  })
}

module.exports.handleCtrlC = handleCtrlC
