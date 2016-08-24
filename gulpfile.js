/**
 * Created by haven on 16/8/24.
 */
var gulp = require('gulp');
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps');


gulp.task('default', function () {
    // place code for your default task here

});

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