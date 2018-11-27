
const request = require('supertest');
const responseTime = require('..');
const Koa = require('koa');

describe('Test koa response time', () => {
  it('hrtime: false', () => {
    const app = new Koa();

    app.use(responseTime());

    return request(app.listen())
      .get('/')
      .expect('x-response-time', /^[0-9]{1,3}ms$/)
      .expect(404);
  });

  it('hrtime: true', () => {
    const app = new Koa();

    app.use(responseTime({
      hrtime: true
    }));

    return request(app.listen())
      .get('/')
      .expect('x-response-time', /^[0-9]{1,3}.[0-9]{6}ms$/)
      .expect(404);
  });
});
