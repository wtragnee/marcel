const _ = require('lodash');

// Here we could use a proper log system like winston
class Logger {
  static get LEVELS() {
    return ['error', 'log', 'debug'];
  }

  constructor({ config }) {
    this.logLevel = _.indexOf(Logger.LEVELS, config.app.logLevel);
  }

  print(level, text) {
    if (level <= this.logLevel) {
      console.log(text);
    }
  }

  debug(text) {
    this.print(2, text);
  }

  log(text) {
    this.print(1, text);
  }

  error(text) {
    this.print(0, text);
  }
}

module.exports = Logger;
