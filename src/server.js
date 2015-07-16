/**
 * Create server Node with Express
 * @author Jean BOUDET
 */

// Load file with .jsx
require("node-jsx").install({
	harmony: true,
	extension: ".jsx"
});

if (process.env.NODE_ENV !== "prod") {
	require("babel/register")({
		stage: 1
	});
}

// Dependencies
var express       = require("express"),
		expstate      = require("express-state"),
		server        = express(),
		React         = require("react"),
		app           = require("./app"),
		navigation    = require("fluxible-router").navigateAction,
		HtmlComponent = React.createFactory(require("./components/Html"));

// Use expose function
expstate.extend(server);

// Static ressource
server.use("/static", express.static(__dirname+"/assets/dist"));

// All requests
server.use(function(req, res, next) {
	var context = app.createContext();
	var params = {
		url: req.url	
	};

	// Router
	context.getActionContext().executeAction(navigation, params, function(err) {
		if (err) {
			if (err.status && err.status === 404)	{
				next();	
			} else {
				next(err);
			}
			res.send("Erreur la page n'existe pas");
			return;
		}

		// Save state of app
		res.expose(app.dehydrate(context), 'states');

		// Get HTML string
		var html = React.renderToStaticMarkup(HtmlComponent({
			markup: React.renderToString(context.createElement()),
			context: context.getComponentContext(),
			mode: process.env.NODE_ENV,
			state: res.locals.state
		}));
		res.send(html);
	});
});

// Server listen
var server = server.listen(3000, function() {
	var host = server.address().host;
	var port = server.address().port;

	console.log("Server run on http://%s:%s", host, port);
});

