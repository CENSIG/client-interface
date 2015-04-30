/**
 * Routes
 * @author Jean BOUDET
 */

// Dependencies
var express      = require("express"),
		router       = express.Router(),
		React        = require("react"),
	  Router       = require("react-router"),
		routes       = require('./routes'),
	  clientRoutes = require("../assets/js/clientRoutes");

function createRoute(route, path) {
	router.get(path, function(req, res) {
		Router.run(clientRoutes, req.path, function(Handler) {
			var handler = React.renderToString(React.createElement(Handler));
			res.render("base", {
				title: route.title,
				dev: process.env.PROD_MODE,
				handler: handler
			});
		});
	});

	if (route.hasOwnProperty('nested')) {
		route.nested.forEach(function(nested) {
    	createRoute(nested, nested.path);
		});
	}
}

routes.forEach(function(route) {
	createRoute(route, route.path);
});

// Public
module.exports = router;
