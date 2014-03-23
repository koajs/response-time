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
  return function *responseTime(next){
    var start = Date.now();
    yield* next;
    var delta = Math.ceil(Date.now() - start);
    this.set('X-Response-Time', delta + 'ms');
  }
}
