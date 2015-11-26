
var responseTime = require('./');
var Koa = require('koa');
var app = new Koa();

app.use(responseTime());

app.use(function (ctx, next){
  return next().then(function () {
    return sleep(150);
  }).then(function () {
    ctx.body = 'Hello';
  });
});

function sleep(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(function done() {
      resolve();
    }, ms);
  });
}

app.listen(3000);

console.log('listening on port 3000');
