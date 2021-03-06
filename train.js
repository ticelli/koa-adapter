const Train = require('ticelli-bot/train');


module.exports = class KoaTrain extends Train {
  close() {
    const { proxy } = this;
    proxy.res.flushHeaders();
    proxy.res.end(proxy.body);
    proxy.res.setHeader = () => {}; // prevent set header
    return this;
  }

  setBody(body) {
    const { proxy } = this;
    proxy.body = body;
    return this;
  }

  setStatus(code) {
    if (code) {
      const { proxy } = this;
      proxy.response.status = code;
    }
    return this;
  }

  get isAnswered() {
    return (this.proxy.state.answers || []).length
  }

  setHeader(key, value) {
    this.set(key, value);
    return this;
  }
};
