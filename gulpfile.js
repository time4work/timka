const gulp = require('gulp');

global.__basedir = __dirname;

const tasks = require('./tasks');

gulp.task('js', tasks.js)
gulp.task('style', tasks.style);
gulp.task('fonts', tasks.fonts)
gulp.task('watch', tasks.watch);
gulp.task('html', tasks.html);
gulp.task('img', tasks.img);
gulp.task('default', gulp.series('style', 'fonts', 'js', 'html', 'img'));