var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var minify = require('gulp-minify');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compress', function() {
  gulp.src('js/*.js')
    .pipe(minify({
        ext:{
            //src:'-debug.js',
            min:'-manify.js'
        },
        exclude: ['min', 'radialprogress'],
        ignoreFiles: ['.combo.js', '-min.js', '*min.js', '-manify.js']
    }).on('error', function(e) {
      console.log(e);
    }))
    .pipe(gulp.dest('js/'))
});

gulp.task('sass', function() {
  return gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'expanded', sourceComments: 'map'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('sass/**/*.scss').on('change', browserSync.reload);
  gulp.watch('js/*.js').on('change', browserSync.reload);
});
