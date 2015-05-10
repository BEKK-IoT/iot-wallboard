'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('browser-sync', ['js'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("index.html").on('change', reload);
    gulp.watch("app/**/*.js", ['js-watch']);
});

gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './app/js/entry.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [reactify]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});