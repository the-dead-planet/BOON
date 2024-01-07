import * as core from "express-serve-static-core";
import Route from "./route";

// Definitions of all routes.
class Routes {
    public routes: InstanceType<(typeof Route)>[]
    public constructor(routes: InstanceType<(typeof Route)>[]) {
        this.routes = routes;
    }

    public connect(app: core.Express) {
        this.routes.forEach((route) => route.connect(app));
    }
}

export default Routes;
