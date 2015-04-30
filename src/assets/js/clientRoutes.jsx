var React        = require('react'),
		Router       = require('react-router'),
		Route        = Router.Route,
		DefaultRoute = Router.DefaultRoute,
		routes       = require("../../routing/routes");

var res = routes.map(function(route) {

	var nested       = null;
	var defaultRoute = null;

	if (route.hasOwnProperty('nested')) {
		nested = route.nested.map(function(nestedRoute, j) {
			return (
				<Route key={j} name={nestedRoute.name} handler={nestedRoute.component} />
			);
		});
	}

	if (route.hasOwnProperty('defaultRoute')) {
		defaultRoute = (
			<DefaultRoute handler={route.defaultRoute} />
		);
	}
	return (
		<Route name={route.name} path={route.path} handler={route.component}>
			{nested}
			{defaultRoute}
		</Route>
	);
});

module.exports = res;
