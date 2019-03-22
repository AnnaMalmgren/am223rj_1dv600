/**
* Module for class HighScore
* @module ./src/HighScore.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'

const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

/**
 * Class for HighScore
 * @class HighScore
 */
class HighScore {
  /**
   * Creates an instance of HighScore.
   * @memberof HighScore
   */
  constructor () {
    this.nrOfList = 5
    this.index = null
    this.pointsArr = []
    this.file = process.argv.slice(4).toString() || path.join('./data', '/highScore.json')
  }

  /**
   * Renders the high score view.
   *
   * @memberof HighScore
   */
  async highScoreView () {
    await fs.readFile(this.file, async (err, data) => {
      if (err) {
        console.log(err.message)
      }
      let json = await JSON.parse(data)

      let highScore = await this.sortHighScore(json)
      let logs = await this.logHighScore(highScore)
      logs.map(log => console.log(chalk.blue(log)))
    })
  }

  /**
   * Creates an array with the high score strings to log.
   *
   * @param {Object[]} highScore Array with the high score Objects sorted descending.
   * @returns array with the high score strings to log
   * @memberof HighScore
   */
  logHighScore (highScore) {
    let log = []
    let count = 1
    highScore.map(obj => {
      log.push(`\n${count}| ${obj.name} with result ${obj.points}`)
      count++
    })
    return log
  }

  /**
   * Sorts the array with highscore objects descending by comparing the points.
   *
   * @param {*} highscoreArr Array with the high score objects.
   * @returns array with highscore objects descending by comparing the points.
   * @memberof HighScore
   */
  sortHighScore (highscoreArr) {
    function compare (a, b) {
      const pointsA = a.points
      const pointsB = b.points
      let comparison = 0

      pointsA < pointsB ? comparison = 1 : comparison = -1

      return comparison * -1
    }

    return highscoreArr.sort(compare)
  }

  /**
   * Checks if the new high score object makes it into to the high score.
   *
   * @param {Object[]} json Array with the high score objects from the highScore file.
   * @param {String} nickname The nickname of the player
   * @param {Number} time the time it took the payer to guess the word.
   * @returns the updates array with high score objects.
   * @memberof HighScore
   */
  updateJsonToBeSent (json, nickname, time) {
    this.pointsArr = []
    json.map(obj => this.pointsArr.push(parseFloat(obj.points)))

    let maxPoint = Math.max(...this.pointsArr)
    this.index = this.pointsArr.indexOf(maxPoint)

    if (time < maxPoint) {
      let highScoreObj = { 'name': nickname, 'points': time }
      json.splice(this.index, 1)
      json.push(highScoreObj)
      return json
    }

    return json
  }

  /**
   * Checks length of high score list and updates it accordingly.
   *
   * @param {String} nickname the nickname of the player.
   * @param {Number} time the time it took the player to guess the word.
   * @memberof HighScore
   */
  async checkHighScorePoints (nickname, time) {
    await fs.readFile(this.file, async (err, data) => {
      if (err) {
        console.log(err.message)
      }

      let json = await JSON.parse(data)

      if (json.length < this.nrOfList) {
        await this.updatehighScore(nickname, time)
      } else {
        json = await this.updateJsonToBeSent(json, nickname, time)
        await fs.writeFile(this.file, JSON.stringify(json), err => {
          if (err) {
            console.log(err.message)
          }
        })
      }
    })
  }

  /**
   * Adds a high score object to the high score array.
   * @param {Object[]} json Array with the high score objects from the highScore file.
   * @param {String} nickname The nickname of the player
   * @param {Number} time the time it took the player to guess the word.
   * @returns the updated array with high score objects.
   * @memberof HighScore
   */
  async addAScore (json, nickname, time) {
    let highScoreObj = { 'name': nickname, 'points': time }
    json.push(highScoreObj)
    return json
  }

  /**
   * Writes updates version of high score list to the highScore file.
   * @param {String} nickname The nickname of the player
   * @param {Number} time the time it took the player to guess the word.
   * @memberof HighScore
   */
  async updatehighScore (nickname, time) {
    await fs.readFile(this.file, async (err, data) => {
      if (err) {
        console.log(err.message)
      }
      let json = await JSON.parse(data)
      let result = await this.addAScore(json, nickname, time)
      await fs.writeFile(this.file, JSON.stringify(result), err => {
        if (err) {
          console.log(err.message)
        }
      })
    })
  }
}

module.exports.HighScore = HighScore
