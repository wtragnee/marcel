const express = require('express');

const Config = require('./Misc/Helper/Config');
const Logger = require('./Misc/Helper/Logger');

const config = new Config().load();
const logger = new Logger({ config });

const app = express();

// app.get('/ping', (req, res) => res.send({ pong: _.now() }));

logger.debug('debug');
logger.log('log');
logger.error('error');

app.listen(config.app.port, () => {
  logger.debug(`App started listening on port ${config.app.port}`);
});
