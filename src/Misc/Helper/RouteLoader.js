const _ = require('lodash');

class RouteLoader {
  /**
   * @param {Object} config
   */
  constructor({ config }) {
    this.routes = config.app.routes;
  }

  /**
   * @param  {Express} app
   * @param  {Object} config
   * @param  {Logger} logger
   */
  load({ app, config, logger }) {
    _.forEach(this.routes, (path) => {
      // eslint-disable-next-line
      const Route = require(`../../Core/RouteController/${path}`);
      const route = new Route({ app, config, logger });
      route.register();
    });
  }
}

module.exports = RouteLoader;
