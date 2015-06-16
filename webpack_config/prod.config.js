/**
 * Webpack configuration for production
 * @author Jean BOUDET
 */
var webpack     = require("webpack"),
		ExtractText = require("extract-text-webpack-plugin"),
		path        = require("path");

// Path
var pathToSrc  = path.resolve(__dirname, "../src/");
var pathToDist = path.join(pathToSrc, "assets/dist");

// Define global variable for include css file
var define = new webpack.DefinePlugin({
	"process.env": {
		BROWSER: JSON.stringify(true),
		DEV_MODE: JSON.stringify(false)
	}
});

// Extract all css files in one
var extract = new ExtractText("bundle.css");

// Uglify javascript
var uglify = new webpack.optimize.UglifyJsPlugin();

// Deduplication
var dedup = new webpack.optimize.DedupePlugin();

// Vendors
var vendors = new webpack.optimize.CommonsChunkPlugin("vendors", "vendor.bundle.js");

module.exports = {
	context: pathToSrc,
	entry: {
		app: path.join(pathToSrc, "client.js"),
		vendors: [
			"react", "fluxible", "bluebird", 
			"fluxible-router", "immutable", "leaflet",
			"object-assign", "react-leaflet", "superagent" 	
		]
	},
	output: {
		path: pathToDist, 
		filename: "app.bundle.js"
	},
	module: {
		loaders: [
			{test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"},
			{test: /\.css$/, loader: ExtractText.extract("style-loader", "css-loader!cssnext-loader")},
			{test: /\.png$/,  loader: "url?prefix=static/&limit=10000&mimetype=image/png" },
			{test: /\.jpg$/,  loader: "url?prefix=static/&limit=10000&mimetype=image/jpg" },
			{test: /\.jpeg$/,  loader: "url?prefix=static/&limit=10000&mimetype=image/jpeg" },
			{test: /\.woff$/, loader: "url?prefix=static/&limit=10000&mimetype=application/font-woff" },
			{test: /\.woff2$/, loader: "url?prefix=static/&limit=10000&mimetype=application/font-woff2" },
			{test: /\.ttf$/,  loader: "url?prefix=static/&limit=10000&mimetype=application/octet-stream" },
			{test: /\.eot$/,  loader: "file" },
			{test: /\.svg$/,  loader: "url?prefix=static/&limit=10000&mimetype=image/svg+xml" }
		]	
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
		root: pathToSrc,
		modulesDirectories:	["node_modules"]
	},
	plugins: [define, dedup, extract, uglify, vendors]
};
