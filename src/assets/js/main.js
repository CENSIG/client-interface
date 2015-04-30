/**
 * Gateway for client side
 * @author Jean BOUDET
 */
var React        = require("react"),
		Router       = require("react-router"),
	  clientRoutes = require("./clientRoutes");

if (typeof window !== "undefined") {
	window.onload = function() {
		Router.run(clientRoutes, Router.HistoryLocation, function(Handler) {
			React.render(React.createElement(Handler), document.querySelector("div.main"));
		});
	};
}
