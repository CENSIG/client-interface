var RouteStore = require("fluxible-router").RouteStore,
		routes     = require("../configs/routes");

module.exports = RouteStore.withStaticRoutes(routes);
