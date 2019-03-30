const _ = require('lodash');

const RequestManager = require('../../Misc/Helper/RequestManager');

const Driver = require('../Entity/Driver');

class DriverModel {
  constructor({ config }) {
    this.config = config;
    this.rq = new RequestManager({ config });
  }

  async get() {
    const drivers = await this.rq.get({
      uri: this.config.driver.uri,
      json: true,
    });
    return _.map(drivers, (driver) => {
      const { lat, long } = driver.currentLocation;
      return new Driver(_.assignIn(driver, {
        lat: parseFloat(lat),
        lon: parseFloat(long),
      }));
    });
  }
}

module.exports = DriverModel;
