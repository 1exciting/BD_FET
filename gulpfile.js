/**
 * Created by haven on 16/8/24.
 */
var gulp = require('gulp');
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');

gulp.task('default', ['song_scss','song_watch']);

gulp.task('bao-1-8', function () {
    return gulp.src('./stage1/task8/bao/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./stage1/task8/bao/css/'));
});

gulp.task('bao-1-8:watch', function () {
    gulp.watch('./stage1/task8/bao/sass/**/*.sass', ['bao-1-8']);
});


gulp.task('bao-1-10', function () {
    return gulp.src('./stage1/task10/bao/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./stage1/task10/bao/css/'));
});

gulp.task('bao-1-10:watch', function () {
    gulp.watch('./stage1/task10/bao/sass/**/*.sass', ['bao-1-10']);
});

/**
 * song contron here
 */
 var song_paths={
    task8_scss:"stage1/task8/song/scss/*.scss",
    task8_scss_dest:"stage1/task8/song/css"
 }
 gulp.task("song_scss",function(){
    gulp.src(song_paths.task8_scss)
        .pipe(sass())
        .pipe(gulp.dest(song_paths.task8_scss_dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(song_paths.task8_scss_dest));
 });
 gulp.task("song_watch",function(){
    gulp.watch(song_paths.task8_scss, ['song_scss']);
 });