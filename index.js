const express = require('express');

const Config = require('./Misc/Helper/Config');
const Logger = require('./Misc/Helper/Logger');
const RouteLoader = require('./Misc/Helper/RouteLoader');

const config = new Config().load();
const logger = new Logger({ config });

const app = express();

new RouteLoader({ config }).load(app);

app.listen(config.app.port, () => {
  logger.debug(`App started listening on port ${config.app.port}`);
});
