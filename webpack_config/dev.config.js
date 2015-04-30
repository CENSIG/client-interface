/**
 * Webpack configuration for dev
 * @author Jean BOUDET
 */
var webpack = require("webpack"),
		path    = require('path');

// Path
var pathToAssets = path.resolve(__dirname, "../src/assets/");
var pathToJs     = path.join(pathToAssets, "js");
var pathToDist   = path.join(pathToAssets, "dist");

// Define global variable for include css file
var define = new webpack.DefinePlugin({
	"process.env": {
		BROWSER: JSON.stringify(true),
		PROD_MODE: JSON.stringify(false)
	}
});

module.exports = {
	context: pathToJs,
	entry: "./main.js",
	output: {
		path: pathToDist,
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{test: /\.jsx$/, loader: "jsx-loader?harmony"},
			{test: /\.css$/, loader: "style!css!cssnext-loader"},
			{test :/\.jpe?g$/, loader: "url-loader?prefix=static/"}
		]	
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
		root: pathToJs,
		modulesDirectories:	["node_modules"]
	},
	plugins: [define]
};
