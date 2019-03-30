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
   */
  load(app) {
    _.forEach(this.routes, path => {
      const Route = require(`../../Core/RouteController/${path}`);
      const route = new Route({ app });
      route.register();
    });
  }
}

module.exports = RouteLoader;
