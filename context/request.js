const AbstractRequest = require('ticelli-bot/context/request');
module.exports = class Request extends AbstractRequest {
  get body() {
    return this.request.body;
  }
  get request() {
    return this.root.request;
  }
};