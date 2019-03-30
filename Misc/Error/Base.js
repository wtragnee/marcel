class BaseError {
  constructor({ text }) {
    this.text = text;
    this.statusCode = 500;
  }
}

module.exports = BaseError;
