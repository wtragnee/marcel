const _ = require('lodash');

const BaseRoute = require('./BaseRoute');
const DriverModel = require('../Model/DriverModel');
const { BaseError, FormatError } = require('../../Misc/Error');

class RideProposalRoute extends BaseRoute {
  constructor(...args) {
    super(...args);
    this.driver = new DriverModel(...args);
  }

  get routeConfig() {
    return {
      path: '/rideProposal',
    };
  }

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
      throw new FormatError({ text: 'Invalid value for latitude' });
    }
    return { lat, lon };
  }

  validateBody(
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

  get() {
    return async (req, res) => {
      try {
        const { departure, arrival } = this.validateBody(req.query);
        return res.json({ departure, arrival });
        // return res.json({
        //   expectedWaitingTime: 240,
        //   price: 25,
        //   priceCurrency: 'eur',
        //   driver: {
        //     firstName: 'Kevin',
        //     lastName: 'Juniot',
        //     carModel: 'Aston Martin - CX',
        //     plateNumber: 'AZ-2345',
        //     range: 'ECO',
        //   },
        // });
      } catch (err) {
        const exception = (err instanceof BaseError) ? err : new BaseError({ text: err.message });
        this.logger.error(exception);
        return exception.send(res);
      }
    };
  }
}

module.exports = RideProposalRoute;
