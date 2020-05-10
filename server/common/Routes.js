// Definitions of all routes.
class Routes {
    constructor(routes) {
        this.routes = routes;
    }

    connect(app) {
        this.routes.forEach(route => route.connect(app));
    }
}

module.exports = Routes;
