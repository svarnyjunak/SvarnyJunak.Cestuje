var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');

gulp.task('default', function() {
  return gulp.src(['public/javascripts/lightbox.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/javascripts/'))
        .pipe(notify({ message: 'Javascript minification completed.' }));
});