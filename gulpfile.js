'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');

gulp.task('sass', function() {
    return gulp.src(["app/components/css/*.scss", "app/components/css/*.css", "app/scss/*.scss"])
        .pipe(sass())
        .pipe(gulp.dest("app/dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src(['app/components/js/*.js', 'app/scripts/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/dist/js/'))
        .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'scripts'], function() {

    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("app/scss/**", ['sass']);
    gulp.watch("app/scripts/*.js", ['scripts']);
    gulp.watch( ["app/*.html"] ).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);