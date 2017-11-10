const AbstractResponse = require('ticelli-bot/context/response');

module.exports = class Response extends AbstractResponse {
  set body(val) {
    this.root.body = val
  }
  get body() {
    return this.root.body;
  }
};