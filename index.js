/**
 * Expose `responseTime()`.
 */

module.exports = responseTime;

/**
 * Add X-Response-Time header field.
 * @param {Dictionary} options options dictionary. { hrtime }
 *
 *        hrtime: boolean.
 *          `true` to use time in nanoseconds.
 *          `false` to use time in milliseconds.
 *          Default is `false` to keep back compatible.
 * @return {Function}
 * @api public
 */

function responseTime(options) {
  let hrtime = options && options.hrtime;
  return function responseTime(ctx, next) {
    let start = process.hrtime();
    return next().then(() => {
      let delta = process.hrtime(start);

      // Format to high resolution time with nano time
      delta = delta[0] * 1000 + delta[1] / 1000000;
      if (!hrtime) {
        // truncate to milliseconds.
        delta = Math.round(delta);
      }
      ctx.set('X-Response-Time', delta + 'ms');
    });
  };
}
