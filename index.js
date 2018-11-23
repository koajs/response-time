/**
 * Expose `responseTime()`.
 */

module.exports = responseTime;

/**
 * Add X-Response-Time header field.
 * @param {Dictionary} options options dictionary. { highResolution }
 *
 *        highResolution: boolean.
 *          `true` to return time in nanoseconds.
 *          `false` to return time in milliseconds.
 *          Default is `false` to keep back compatible.
 * @return {Function}
 * @api public
 */

function responseTime(options) {
  var highResolution = options && options.highResolution;
  return function responseTime(ctx, next){
    var start = process.hrtime();
    return next().then(function () {
      var delta = process.hrtime(start);

      // Format to high resolution time with nano time
      delta = delta[0] * 1000 + delta[1]/1000000;
      if (!highResolution) {
        // truncate to milliseconds.
        delta = delta.toFixed(3);
      }
      ctx.set('X-Response-Time', delta + 'ms');
    });
  }
}
