/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

//var gulp = require('gulp');

var gulp = require("gulp"),
    merge = require("merge-stream"),
    rimraf = require("rimraf");

var paths = {
	webroot: "./wwwroot/",
	node_modules: "./node_modules/"
};

paths.libDest = paths.webroot + "lib/";

gulp.task("clean:libs", function (cb) {
	rimraf(paths.libDest, cb);
});

gulp.task("copy:libs", ["clean:libs"], function () {

	var angular2 = gulp.src(paths.node_modules + "@angular/*/bundles/**/*.js")
        .pipe(gulp.dest(paths.libDest + "angular2"));

	var systemjs = gulp.src(paths.node_modules + "systemjs/dist/*.js")
        .pipe(gulp.dest(paths.libDest + "systemjs"));

	var rxjs = gulp.src(paths.node_modules + "rxjs/bundles/**/*.js")
        .pipe(gulp.dest(paths.libDest + "rxjs"));

	return merge(angular2, systemjs, rxjs);
});