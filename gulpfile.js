var gulp = require('gulp'),
    less = require('gulp-less'),
    clean = require('gulp-clean'),
    webpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config');

// Clean
gulp.task('clean', function() {
    gulp.src('bin', {
            read: false
        })
        .pipe(clean())
});

// WEBPACK: Pack react components
gulp.task('webpack', function() {
    return gulp
        .src('./')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('bin/scripts/'));
});

// Less -> Css
gulp.task('styles', function() {
    gulp.src('src/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('bin/styles/'));
});

// Static resource
gulp.task('static', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('bin/'))
});

// Watch changes
gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.less', ['styles']);
    gulp.watch('src/scripts/**/*.js*', ['webpack']);
    gulp.watch('src/*.html', ['static']);
});

gulp.task('default', ['static', 'styles', 'webpack']);
