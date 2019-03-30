const BaseError = require('./Base');

class RequestError extends BaseError {
  constructor({ text }) {
    super({ text });
    this.statusCode = 500;
  }
}

module.exports = RequestError;
