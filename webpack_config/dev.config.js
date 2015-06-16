/**
 * Webpack configuration for dev
 * @author Jean BOUDET
 */
var webpack = require("webpack"),
		path    = require('path');

// Paths
var mainPath = {
	src     : path.resolve(__dirname, "../src/"),
	modules : path.resolve(__dirname, "../node_modules/"),
	dist    : path.resolve(__dirname, "../src/assets/dist")
};

// Define global variable for include css file
var define = new webpack.DefinePlugin({
	"process.env": {
		BROWSER: JSON.stringify(true),
		DEV_MODE: JSON.stringify(true)
	}
});

var config = {
	context: mainPath.src, 
	entry: "./client.js",
	output: {
		path: mainPath.dist,
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/, 
				exclude: /node_modules/, 
				loader: "jsx-loader!babel-loader"
			},
			{test: /\.css$/, loader: "style!css!cssnext-loader"},
			{test :/\.(jpe?g|png|woff2?|ttf|eot|svg)$/i, loader: "url-loader?prefix=static/"},
		],
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
		root: mainPath.src,
		modulesDirectories:	["node_modules"]
	},
	watch: true,
	plugins: [define]
};

module.exports = config;
