
/**
 * Module dependencies.
 */

var send = require('send');
var path = require('path');
var resolve = path.resolve;

/**
 * Expose `responseTime()`.
 */

module.exports = responseTime;

/**
 * Add X-Response-Time header field.
 *
 * @return {Function}
 * @api public
 */

function responseTime() {
  return function(next){
    return function *(){
      var start = new Date;
      yield next;
      var delta = new Date - start;
      this.set('X-Response-Time', delta + 'ms');
    }
  }
}
