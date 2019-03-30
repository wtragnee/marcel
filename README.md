# Marcel

## How to test
1. Using Heroku
You can find it [here](https://wtragnee-marcel.herokuapp.com) with this [example](https://wtragnee-marcel.herokuapp.com/rideProposal?depLat=48.827591&depLong=2.355275&arrLat=48.889934&arrLong=2.347035)

2. Using docker
`DISTANCE_APIKEY={{GOOGLE_APIKEY}} docker-compose up -d`

3. Using node
```
npm install
NODE_ENV=dev DISTANCE_APIKEY={{GOOGLE_APIKEY}} node index.js
```

## What has been done
1. Architecture
- index.js: entry
- Core:
-* RouteController: The different routes the API can use. The rules (for example, how the price is calculated) will be here
-* Model: They use the connectors to require the data (for example, here, the Drivers). They are the only one that should use connectors. A model can change its connectors, it should never change its inputs/outputs, so if we need to use, for example, a mysql instead of a request, the model is the only place we have a modification to make
-- Entity: Initialized by models, classes where we make operations (for example, for a driver, validate its car)
- Misc:
-- Error: Classes helping for the error gestion, so the app won't crash, and we do not have to repeat the gestion of errors. We can create one class for everything (Google request failed, invalid inputs, timeout...)
-- Helper:
--- connectors (in this example, we only have the RequestManager, but we may find a cache, mysql, datastore, ...)
--- transverse classes (config and logger)
--- classes that initalize other depending on the config (here, we have the RouteLoader, which will load the routes given in `config.app.routes`), but we would also find a CacheLoader

## What may be done, given more time
- Really implement Config, with env variables
- Add watcher on files
- Swagger documentation for routes
- Use cache in DriverModel to not request new API every time
- Add retry to RequestManager, using the config
- Better coverage
- Integration tests
- I read in the google api documentation that we can give multiple origins, so we may request all the drivers in only one request, and have the same result, just significantly faster and with less requests on the Google project. For that, we could use Node's setImmediate() and batching the request
