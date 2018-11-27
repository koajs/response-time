
let responseTime = require('./');
let Koa = require('koa');
let app = new Koa();

app.use(responseTime({ hrtime: true }));

app.use((ctx, next) => {
  return next().then(() => {
    return sleep(150);
  }).then(() => {
    ctx.body = 'Hello';
  });
});

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

app.listen(3000);

console.log('listening on port 3000');
