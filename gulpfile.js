const gulp = require("gulp");
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

const jsPath = 'potato/src/**.js';

gulp.task('minifyjs', function () {
    return gulp.src(jsPath).pipe(concat('./potato/potato.js')).pipe(uglify()).pipe(gulp.dest('./'));
});

gulp.task('default', gulp.series('minifyjs'));

gulp.task('watch', function () {
    gulp.watch(jsPath, gulp.task('minifyjs'));
});