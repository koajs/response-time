
# koa-response-time

[![Greenkeeper badge](https://badges.greenkeeper.io/koajs/response-time.svg)](https://greenkeeper.io/)

 X-Response-Time middleware for Koa v2.

## Installation

```js
$ npm install koa-response-time
```

## Usage

Basic usage:

    var Koa = require('koa');
    var responseTime = require('koa-response-time');
    var app = new Koa();

    app.use(responseTime());

If you need response high resolution in nano time, set `highResolution` option to `true`:

    app.use(responseTime(highResolution: true));


Sample response header with `highResolution = false` (default):

    X-Response-Time: 153ms

Sample response header with `highResolution = true`:

    X-Response-Time: 153.812ms


## Note

  Best to `.use()` at the _top_ before any other middleware,
  to wrap all subsequent middleware.

## License

  MIT
