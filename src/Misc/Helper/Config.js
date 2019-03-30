// This class is used to load config depending on the NODE_ENV
// We may allow to override properties depending on the ENV

class Config {
  load() {
    this.config = {
      // In app, we have the global config, like listening port,
      // the routes to load, the logger level...
      app: {
        port: 8000,
        logLevel: 'debug',
        routes: [
          'PingRoute.js',
          'RideProposalRoute.js',
        ],
      },
      driver: {
        uri: 'https://chauffemarcel.cab/yuso-gateway/drivers',
      },
      ride: {
        pricePerKm: 1.5,
        pricePerMin: 0.32,
        normalHourFactor: 1,
        pickHourFactor: 1.2,
        pickHourRanges: [
          ['07:00', '09:00'],
          ['16:00', '19:00'],
        ],
      },
      distance: {
        apiKey: process.env.DISTANCE_APIKEY, // normally, it would be done in a module/loader
        uri: 'https://maps.googleapis.com/maps/api/distancematrix/json',
      },
    };
    return this.config;
  }
}

module.exports = Config;
