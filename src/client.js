/**
 * Gateway for client side
 * @author Jean BOUDET
 */
var React = require("react"),
		app   = require("./app");

if (typeof window !== "undefined") {

	// Load state of app
	app.rehydrate(window.states, function(err, context) {
		if (err) throw err;
		React.render(context.createElement(), document.querySelector("div.main"));
	});
}
