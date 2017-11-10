const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const RequestWrapper = require('./context/request');
const ResponseWrapper = require('./context/response');

module.exports = function(path, ...middlewares) {
  if (middlewares.length === 0) {
    throw new Error('Handler required');
  }

  const router = new Router();

  router.use(bodyParser());
  router.all(
    path,
    async (ctx, next) => {
        const request = new RequestWrapper(ctx);
        const response = new ResponseWrapper(ctx);
        for (const router of middlewares) {
          await router.run(request, response);
        }
        await next();
    },
  );
  return router.routes();
};