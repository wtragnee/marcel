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
    };
    return this.config;
  }
}

module.exports = Config;
