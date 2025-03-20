/**
 * Expose `responseTime()`.
 */

module.exports = responseTime;

const defaultProps = { hrtime: false };

/**
 * @typedef {import("koa").Middleware} Middleware
 */

/**
 * Add X-Response-Time header field.
 * @param {Object} options options dictionary. { hrtime }
 * @param {boolean} options.hrtime
 *          - `true` to use time in nanoseconds.
 *          - `false` to use time in milliseconds.
 *          Default is `false` to keep back compatible.
 * @return {Middleware} Koa Middleware
 * @api public
 */
function responseTime(options = defaultProps) {
  const hrtime = options && options.hrtime;
  return function responseTime(ctx, next) {
    const start = ctx[Symbol.for('request-received.startAt')]
      ? ctx[Symbol.for('request-received.startAt')]
      : process.hrtime();
    return next().then(() => {
      let delta = process.hrtime(start);
      // Format to high resolution time with nano time
      delta = delta[0] * 1000 + delta[1] / 1000000;
      if (!hrtime) {
        // truncate to milliseconds.
        delta = Math.round(delta);
      }
      ctx.set((options && options.header) || 'X-Response-Time', delta + 'ms');
    });
  };
}
