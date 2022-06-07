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
  const hrtime = options && options.hrtime;
  return async function responseTime(ctx, next) {
    const start = ctx[Symbol.for('request-received.startAt')]
      ? BigInt(ctx[Symbol.for('request-received.startAt')])
      : process.hrtime.bigint();
    await next();
    const delta = Number(process.hrtime.bigint() - start) / 1000000;
    ctx.set(
      'X-Response-Time',
      `${hrtime ? delta : Math.round(delta)}ms`
    );
  };
}

/**
 * Expose `responseTime()`.
 */

module.exports = responseTime;
