const _ = require('lodash');

const BaseRoute = require('./BaseRoute');

class RideProposalRoute extends BaseRoute {
  get config() {
    return {
      path: '/rideProposal',
    };
  }

  get() {
    return (req, res) => res.json({ pong: _.parseInt(_.now() / 1000) });
  }
}

module.exports = RideProposalRoute;
