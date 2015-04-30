/**
 * Gulpfile
 */

var gulp   = require("gulp")
		jshint = require("gulp-jshint");

// Path for jshint
var jsHintPath = [
	"./src/server.js",
	"./src/routing/routes.js",
	"./src/routing/serverRoutes.js",
	"./src/assets/js/clientRoutes.jsx",
	"./src/assets/js/main.js",
	"./src/assets/js/components/**/*.jsx",
]

/**
 * jshint task
 */
gulp.task("jshint", function() {
	return gulp.src(jsHintPath)
		.pipe(jshint({ linter: require("jshint-jsx").JSXHINT}))
		.pipe(jshint.reporter('default'));
});
