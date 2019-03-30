const BaseError = require('./Base');

class FormatError extends BaseError {
  constructor({ text }) {
    super({ text });
    this.statusCode = 400;
  }
}

module.exports = FormatError;
