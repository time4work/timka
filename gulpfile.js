const gulp = require('gulp');

global.__basedir = __dirname;

const tasks = require('./tasks');

gulp.task('js', tasks.js)
gulp.task('style', tasks.style);
gulp.task('watch', tasks.watch);
gulp.task('default', gulp.series('style', 'js'));