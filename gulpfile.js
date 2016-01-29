var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    cssFilter = ['public/stylesheets/**/*.css', '!public/stylesheets/**/*.min.css'],
    jsFilter = ['public/javascripts/**/*.js', '!public/javascripts/**/*.min.js'];

gulp.task('styles', function() {
  return gulp.src(cssFilter)
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('public/stylesheets/'))
    .pipe(notify({ message: 'Styles minification complete' }));
});

gulp.task('scripts', function() {
   return gulp.src(jsFilter)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/javascripts/'))
    .pipe(notify({ message: 'Javascript minification complete' }));  
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts');
});

gulp.task('watch', function() {
    gulp.watch(cssFilter, ['styles']);
    gulp.watch(jsFilter, ['scripts']);
    livereload.listen();
    gulp.watch(['public/**']).on('change', livereload.changed);
});