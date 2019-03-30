// This class is used to load config depending on the NODE_ENV
// We may allow to override properties depending on the ENV

class Config {
  load() {
    this.config = {
      // In app, we have the global config, like listening port, logger level...
      app: {
        port: 8000,
        logLevel: 'debug',
      },
    };
    return this.config;
  }
}

module.exports = Config;
