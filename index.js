const express = require('express');

const Config = require('./src/Misc/Helper/Config');
const Logger = require('./src/Misc/Helper/Logger');
const RouteLoader = require('./src/Misc/Helper/RouteLoader');

const config = new Config().load();
const logger = new Logger({ config });

const app = express();

new RouteLoader({ config }).load({ app, config, logger });

const PORT = process.env.PORT || config.app.port;

app.listen(PORT, () => {
  logger.debug(`App started listening on port ${PORT}`);
});
