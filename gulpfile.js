var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    stylelint = require('gulp-stylelint'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    cssFilter = ['public/css/**/*.css', '!public/css/**/*.min.css', '!public/css/**/lg*.css', '!public/css/**/lightgallery*.css'],
    jsFilter = ['public/javascripts/**/*.js', '!public/javascripts/**/*.min.js', '!public/javascripts/**/lightgallery*.js', '!public/javascripts/**/ga*.js'];

gulp.task('styles', function() {
  return gulp.src(cssFilter)
    .pipe(stylelint({
      failAfterError: false,
      reporters: [{formatter: 'string', console: true}]
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('public/css/'))
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