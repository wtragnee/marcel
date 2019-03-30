class BaseError {
  constructor({ text }) {
    this.text = text;
    this.statusCode = 500;
  }

  send(res) {
    return res.status(this.statusCode).json({ message: this.text });
  }
}

module.exports = BaseError;
