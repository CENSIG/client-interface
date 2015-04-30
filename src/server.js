/**
 * Create server Node with Express
 * @author Jean BOUDET
 */

// Dependencies
var express = require("express");
var app     = express();

// Load file with .jsx
require("node-jsx").install({
	harmony: true,
	extension: ".jsx"
});

var serverRoutes = require("./routing/serverRoutes");

// Update the views directory and engine template
app.set("views", __dirname+"/templates");
app.set("view engine", "jade");

// Static ressource
app.use("/static", express.static(__dirname+"/assets/dist"));

// Routes
app.use("/", serverRoutes);

// Server listen
var server = app.listen(3000, function() {
	var host = server.address().host;
	var port = server.address().port;

	console.log("Server run on http://%s:%s", host, port);
});

