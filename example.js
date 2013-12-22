
var responseTime = require('./');
var koa = require('koa');
var app = koa();

app.use(responseTime());

app.use(function *(next){
  yield next;
  yield sleep(150);
  this.body = 'Hello';
});

function sleep(ms) {
  return function(done){
    setTimeout(done, ms);
  }
}

app.listen(3000);

console.log('listening on port 3000');