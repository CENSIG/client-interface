/**
 * Webpack configuration for dev
 * @author Jean BOUDET
 */
var webpack = require("webpack"),
		path    = require('path');

// Path
var pathToSrc  = path.resolve(__dirname, "../src/");
var pathToDist = path.join(pathToSrc, "assets/dist");

// Define global variable for include css file
var define = new webpack.DefinePlugin({
	"process.env": {
		BROWSER: JSON.stringify(true),
		PROD_MODE: JSON.stringify(false)
	}
});

module.exports = {
	context: path.resolve(__dirname, "../src/"),
	entry: "./client.js",
	output: {
		path: pathToDist,
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{test: /\.jsx?$/, loader: "jsx-loader?harmony"},
			{test: /\.css$/, loader: "style!css!cssnext-loader"},
			{test :/\.jpe?g$/, loader: "url-loader?prefix=static/"}
		]	
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
		root: pathToSrc,
		modulesDirectories:	["node_modules"]
	},
	watch: true,
	plugins: [define]
};
