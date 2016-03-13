var gulp = require('gulp');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
gulp.task('compress',['clean'], function () {
    return gulp.src('./js/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(gulp.dest('./js/min'));
});


gulp.task('clean', function() {

    return gulp.src('./js/min', {read: false})
        .pipe(clean());
})

gulp.task('watch', function () {
    gulp.watch('./js/main.js', ['compress'])
})

gulp.task('default', ['watch'])