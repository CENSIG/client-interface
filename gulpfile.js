/**
 * Gulpfile
 */
var gulp             = require("gulp"),
		nodemon          = require("gulp-nodemon"),
		webpack          = require("gulp-webpack"),
		webpackDevConfig = require("./webpack_config/dev.config");

/**
 * Start server with nodemon
 */
gulp.task("start", function () {
  nodemon({
	  script: "src/server.js", 
		ext: "js jsx css", 
		env: { "NODE_ENV": "development" }
	})
});

/**
 * Webpack build
 */
gulp.task("webpack", function() {
	return gulp.src("src/client.js")
		.pipe(webpack(webpackDevConfig))
		.pipe(gulp.dest("src/assets/dist/"))
});

gulp.task("dev", ["start", "webpack"]);
