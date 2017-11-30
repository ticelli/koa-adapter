const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const KoaTrain = require('./train');
const Break = require('ticelli-bot/break');

module.exports = function (path, ...middlewares) {
  if (middlewares.length === 0) {
    throw new Error('Handler required');
  }

  middlewares = middlewares.map(m => (m.root ? m.root : m));
  const router = new Router();

  router.use(bodyParser());
  router.all(
    path,
    async (ctx, next) => {
      const train = (new KoaTrain(ctx)).proxy;
      for (const middleware of middlewares) {
        try {
          if (typeof middleware === 'function') {
            await middleware(train);
          } else {
            await middleware.run(train);
          }
        } catch (e) {
          if (!(e.isBreakInstance)) {
            throw e;
          }
        }
      }
      await next();
    },
  );
  return router.routes();
};
