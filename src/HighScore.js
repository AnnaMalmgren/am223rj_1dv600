/**
* Module for class HighScore
* @module ./src/HighScore.js
* @author am223rj
* @verion v1.0.0
*/

'use strict'
const fs = require('fs')
const chalk = require('chalk')

class HighScore {
  constructor () {
    this.nrOfList = 8
    this.index = null
    this.pointsArr = []
    this.file = './data/highScore.json'
  }

  async highScoreView () {
    await fs.readFile(this.file, async (err, data) => {
      if (err) {
        console.log(err.message)
      }
      let json = await JSON.parse(data)
      let highScore = await this.sortHighScore(json)
      highScore.map(obj => {
        console.log('soretd: ' + obj.name + ' + ' + obj.points)
      })
      let count = 1
      highScore.map(obj => {
        console.log(chalk.blue(`\n${count}| ${obj.name} with result ${obj.points}`))
        count++
      })
    })
  }

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

  async checkHighScorePoints (nickname, time) {
    await fs.readFile(this.file, async (err, data) => {
      if (err) {
        console.log(err.message)
      }

      let json = await JSON.parse(data)

      if (json.length < this.nrOfList) {
        await this.updatehighScore(nickname, time)
      } else {
        this.pointsArr = []
        json.map(obj => this.pointsArr.push(parseFloat(obj.points)))

        let maxPoint = Math.max(...this.pointsArr)
        this.index = this.pointsArr.indexOf(maxPoint)

        if (time < maxPoint) {
          let highScoreObj = { 'name': nickname, 'points': time }
          json.splice(this.index, 1)
          json.push(highScoreObj)
          await fs.writeFile(this.file, JSON.stringify(json), err => {
            if (err) {
              console.log(err.message)
            }
          })
        }
      }
    })
  }

  async updatehighScore (nickname, time) {
    await fs.readFile(this.file, async (err, data) => {
      if (err) {
        console.log(err.message)
      }
      let json = await JSON.parse(data)
      let highScoreObj = { 'name': nickname, 'points': time }
      json.push(highScoreObj)

      await fs.writeFile(this.file, JSON.stringify(json), err => {
        if (err) {
          console.log(err.message)
        }
      })
    })
  }
}

module.exports.HighScore = HighScore
