/**
 * Module for class Timer
 * @author Anna Malmgren (am223rj)
 * @version 1.0.0
 */

/**
 * class for timer.
 *
 * @class Timer
 */
class Timer {
  /**
     * @constructor
     * @memberof Timer
     */
  constructor () {
    this.result = '0.0'
  }

  /**
     * Starts a timer.
     * from - http://www.sitepoint.com/creating-accurate-timers-in-javascript/
     * @memberof Timer
     */
  start () {
    var start = new Date().getTime()
    var time = 0

    /**
       * Updates the time
       * @memberof Timer
       */
    function instance () {
      time += 100
      this.result = Math.floor(time / 100) / 10

      if (Math.round(this.result) === this.result) {
        this.result += '.0'
      }

      var diff = (new Date().getTime() - start) - time
      clearInterval(this.intervalID)
      this.intervalID = setTimeout(instance.bind(this), (100 - diff))
    }

    this.intervalID = setTimeout(instance.bind(this), 100)
  }

  /**
     * Stops the timer
     * @return {number}
     */
  stop () {
    clearInterval(this.intervalID)
    return this.result
  }
}

module.exports.Timer = Timer
