var React        = require("react"),
		Router       = require("react-router"),
		Link         = Router.Link,
		RouteHandler = Router.RouteHandler;

if (process.env.BROWSER) {
	require('../../css/reset.css');
	require('../../css/base/utils.css');
}

var App = React.createClass({
	render() {
		return (
			<RouteHandler />
		);
	}
});

module.exports = App;
