class BaseRoute {
  constructor({ app, logger, config }) {
    this.logger = logger;
    this.config = config;
    this.app = app;
  }

  register() {
    // We can do the same for post, put, etc
    this.app.get(this.routeConfig.path, this.get());
  }
}

module.exports = BaseRoute;
