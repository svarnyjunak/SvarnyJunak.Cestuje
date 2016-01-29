var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');

gulp.task('styles', function() {
  return gulp.src(['public/stylesheets/style.css'])
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('public/stylesheets/'))
    .pipe(notify({ message: 'Styles minification complete' }));
});

gulp.task('scripts', function() {
   return gulp.src(['public/javascripts/lightbox.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/javascripts/'))
        .pipe(notify({ message: 'Javascript minification complete' }));  
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts');
});