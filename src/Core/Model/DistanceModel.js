const _ = require('lodash');

const { BaseError } = require('../../Misc/Error');
const RequestManager = require('../../Misc/Helper/RequestManager');

class DriverModel {
  constructor({ config }) {
    this.config = config;
    this.rq = new RequestManager({ config });
  }

  /**
   * Request google API to get duration and distance between departure and arrival
   * @param  {Object}  departure Should contain lat and lon properties
   * @param  {Object}  arrival   Should contain lat and lon properties
   * @return {Object}            Contain duration and distance properties
   */
  async get({ departure, arrival }) {
    // Could not test this part as the API_KEY is invalid
    const response = await this.rq.get({
      uri: this.config.distance.uri,
      qs: {
        origins: `${departure.lat},${departure.lon}`,
        destinations: `${arrival.lat},${arrival.lon}`,
        key: this.config.distance.apiKey,
      },
      json: true,
    });
    if (response.status !== 'OK') {
      throw new BaseError({ text: `Got invalid status from google: ${response.status}` });
    }
    if (_.some(response.elements)) {
      throw new BaseError({ text: 'Invalid response from google API: missing elements' });
    }
    const element = _.head(response.elements);
    if (element.status !== 'OK' || !_.has(element, 'duration.value') || !_.has(element, 'distance.value')) {
      throw new BaseError({ text: 'Invalid response from google API: invalid element' });
    }
    return {
      duration: element.duration.value,
      distance: element.duration.distance,
    };
  }
}

module.exports = DriverModel;
