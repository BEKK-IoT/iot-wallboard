var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    source = require('vinyl-source-stream');


gulp.task('babelify', function() {
    return browserify({
        entries: './js/app.jsx',
        extensions: ['.jsx'],
        debug: true
    })
    .transform(reactify)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    port: process.env.PORT || 8080,
    livereload: true
  });
});

gulp.task('reload-js', ['babelify'], function() {
    gulp.src('./js/app.jsx').pipe(connect.reload());
});
gulp.task('reload-html', function() {
    gulp.src('./index.html').pipe(connect.reload());
});
gulp.task('reload-css', function() {
    gulp.src('./css/*.css').pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./js/**/*.jsx'], ['reload-js']);
    gulp.watch(['./index.html'], ['reload-html']);
    gulp.watch(['./css/*.css'], ['reload-css']);
})

gulp.task('serve', ['babelify', 'connect', 'watch']);
gulp.task('build', ['babelify']);
