const _ = require('lodash');
const rp = require('request-promise');

const { RequestError } = require('../Error');

class RequestManager {
  constructor({ config }) {
    // We would use this for retry configuration
    this.config = config;
  }

  async request(method, options) {
    try {
      // retry here
      return rp(_.assignIn(options, { method: _.toUpper(method) }));
    } catch (err) {
      throw new RequestError({ text: err.message });
    }
  }

  get(options) {
    return this.request('get', options);
  }
}

module.exports = RequestManager;
