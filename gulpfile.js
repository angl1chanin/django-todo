// https://coryrylan.com/blog/multiple-sources-in-gulpjs
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const merge = require('merge-stream');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const installed_apps = ['main', 'account'];

gulp.task('styles', function () {
  let tasks = installed_apps.map((app) => {
    return gulp
      .src('src/' + app + '/scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(rename({ suffix: '.min', prefix: '' }))
      .pipe(autoprefixer())
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(app + '/static/' + app + '/css'));
  });

  return merge(tasks);
});

gulp.task('scripts', function () {
  let tasks = installed_apps.map((app) => {
    return (
      gulp
        .src('src/' + app + '/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(app + '/static/' + app + '/js'))
    );
  });

  return merge(tasks);
});

gulp.task('watch', function () {
  gulp.watch(
    installed_apps.map((app) => 'src/' + app + '/scss/**/*.scss'),
    gulp.parallel('styles')
  );
  gulp.watch(installed_apps.map((app) => 'src/' + app + '/js/**/*.js'), gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('watch', 'styles', 'scripts'));
