const _ = require('lodash');
const moment = require('moment');
const Promise = require('bluebird');

const BaseRoute = require('./BaseRoute');
const DriverModel = require('../Model/DriverModel');
const DistanceModel = require('../Model/DistanceModel');
const { BaseError, FormatError } = require('../../Misc/Error');

class RideProposalRoute extends BaseRoute {
  constructor(...args) {
    super(...args);
    this.driver = new DriverModel(...args);
    this.distance = new DistanceModel(...args);
  }

  get routeConfig() {
    return {
      path: '/rideProposal',
    };
  }

  /**
   * Parse couple of latitude and longitude from string to float
   * @param  {String]} latString
   * @param  {String]} lonString
   * @return {Object}
   */
  parseCoordinates(latString, lonString) {
    if (_.isUndefined(latString)) {
      throw new FormatError({ text: 'Missing latitude' });
    } else if (_.isUndefined(lonString)) {
      throw new FormatError({ text: 'Missing longitude' });
    }
    const lat = parseFloat(latString);
    if (_.isNaN(lat) || lat < -90 || lat > 90) {
      throw new FormatError({ text: 'Invalid value for latitude' });
    }
    const lon = parseFloat(lonString);
    if (_.isNaN(lon) || lon < -180 || lon > 180) {
      throw new FormatError({ text: 'Invalid value for longitude' });
    }
    return { lat, lon };
  }

  /**
   * Check if query params are valid
   * @param  {String} depLat
   * @param  {String} depLong
   * @param  {String} arrLat
   * @param  {String} arrLong
   * @return {Object}
   */
  validateQuery(
    {
      depLat,
      depLong,
      arrLat,
      arrLong,
    },
  ) {
    return {
      departure: this.parseCoordinates(depLat, depLong),
      arrival: this.parseCoordinates(arrLat, arrLong),
    };
  }

  /**
   * Return the driver closest to the coordinates
   * @param  {Coordinates}  departure
   * @return {Driver}
   */
  async findClosestDriver({ departure: userPosition }) {
    const drivers = await this.driver.get();
    if (_.isEmpty(drivers)) {
      throw new FormatError({ text: 'No free driver for now' });
    }
    const driversWithDuration = await Promise.map(
      drivers,
      async (driver) => {
        const departure = { lat: driver.lat, lon: driver.lon };
        const { duration } = await this.distance.get({ departure, arrival: userPosition });
        return _.assignIn(driver, { expectedWaitingTime: duration });
      },
    );
    return _.minBy(driversWithDuration, 'expectedWaitingTime');
  }

  /**
   * Calculate factor depending on hour the client asks for a ride
   * @return {Float}
   */
  getFactor() {
    // For an optimization, we could calculate the exact hour from the user
    // depending on its coordinates, or by asking the app its timezone
    // As for now, we will just use a timesamp
    const now = moment();
    const { normalHourFactor, pickHourFactor, pickHourRanges } = this.config.ride;
    const isInPickHour = _.some(pickHourRanges, ([start, end]) => now.isBetween(moment(start, 'hh:mm'), moment(end, 'hh:mm')));
    return isInPickHour ? pickHourFactor : normalHourFactor;
  }

  /**
   * Calculate price of the ride
   * @param  {Coordinates} departure
   * @param  {Coordinates} arrival
   * @return {Integer}
   */
  async getRidePrice({ departure, arrival }) {
    // Get info on trip
    const { duration, distance } = await this.distance.get({ departure, arrival });
    const kms = _.parseInt(distance / 1000) || 0;
    const minutes = _.parseInt(duration / 60) || 0;
    const factor = this.getFactor();
    const { pricePerKm, pricePerMin } = this.config.ride;
    // Calculate price as asked
    const price = (kms * pricePerKm + minutes * pricePerMin) * factor;
    // Keep only 2 decimals
    return _.parseInt(price * 100) / 100;
  }

  get() {
    return async (req, res) => {
      try {
        const { departure, arrival } = this.validateQuery(req.query);
        const { driver, price } = await Promise.props({
          driver: this.findClosestDriver({ departure }),
          price: this.getRidePrice({ departure, arrival }),
        });
        return res.json({
          price,
          priceCurrency: 'eur', // As for now, static
          expectedWaitingTime: driver.expectedWaitingTime,
          driver: {
            firstName: driver.firstName,
            lastName: driver.lastName,
            carModel: driver.carModel,
            plateNumber: driver.plateNumber,
            range: driver.range,
          },
        });
      } catch (err) {
        const exception = (err instanceof BaseError) ? err : new BaseError({ text: err.message });
        this.logger.error(exception);
        return exception.send(res);
      }
    };
  }
}

module.exports = RideProposalRoute;
