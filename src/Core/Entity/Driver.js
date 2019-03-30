class Driver {
  constructor({
    firstName,
    lastName,
    carModel,
    plateNumber,
    range,
    lat,
    lon,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.carModel = carModel;
    this.plateNumber = plateNumber;
    this.range = range;
    this.lat = lat;
    this.lon = lon;
  }
}

module.exports = Driver;
