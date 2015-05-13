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

module.exports = {
	context: pathToSrc,
	entry: "./client.js",
	output: {
		path: pathToDist, 
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{test: /\.jsx?$/, loader: "jsx-loader?harmony"},
			{test: /\.css$/, loader: ExtractText.extract("style-loader", "css-loader", "cssnext-loader")},
			{test :/\.(jpe?g|png|woff?2|tff|eot|svg)$/i, loader: "url-loader?prefix=static/"}
		]	
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
		root: pathToSrc,
		modulesDirectories:	["node_modules"]
	},
	plugins: [define, extract, uglify]
};
