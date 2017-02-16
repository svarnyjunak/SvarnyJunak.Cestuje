const gulp = require("gulp");
const cssnano = require("gulp-cssnano");
const stylelint = require("gulp-stylelint");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const notify = require("gulp-notify");
const livereload = require("gulp-livereload");

const cssFilter = ["public/css/**/*.css", "!public/css/**/*.min.css", "!public/css/**/lg*.css", "!public/css/**/lightgallery*.css"];
const jsFilter = ["public/javascripts/**/*.js", "!public/javascripts/**/*.min.js", "!public/javascripts/**/lightgallery*.js", "!public/javascripts/**/ga*.js"];

gulp.task("styles", () => gulp.src(cssFilter)
    .pipe(stylelint({
      failAfterError: false,
      reporters: [{ formatter: "string", console: true }]
    }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cssnano())
    .pipe(gulp.dest("public/css/"))
    .pipe(notify({ message: "Styles minification complete" })));

gulp.task("scripts", () => gulp.src(jsFilter)
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("public/javascripts/"))
    .pipe(notify({ message: "Javascript minification complete" })));

gulp.task("default", () => {
  gulp.start("styles", "scripts");
});

gulp.task("watch", () => {
  gulp.watch(cssFilter, ["styles"]);
  gulp.watch(jsFilter, ["scripts"]);
  livereload.listen();
  gulp.watch(["public/**"]).on("change", livereload.changed);
});
