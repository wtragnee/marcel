const _ = require('lodash');

const BaseRoute = require('./BaseRoute');

class PingRoute extends BaseRoute {
  get routeConfig() {
    return {
      path: '/ping',
    };
  }

  get() {
    return (req, res) => res.json({ pong: _.parseInt(_.now() / 1000) });
  }
}

module.exports = PingRoute;
