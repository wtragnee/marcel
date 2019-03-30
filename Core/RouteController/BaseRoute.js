class BaseRoute {
  constructor({ app }) {
    this.app = app;
  }

  register() {
    // We can do the same for post, put, etc
    this.app.get(this.config.path, this.get());
  }
}

module.exports = BaseRoute;
