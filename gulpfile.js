const gulp = require('gulp');
const watch = require('gulp-watch');

global.__basedir = __dirname;

const tasks = require('./tasks');
const taskNames = [
	'style', 
	'fonts', 
	'js', 
	'html', 
	'img'
];

gulp.task('js', tasks.js)
gulp.task('style', tasks.style);
gulp.task('fonts', tasks.fonts)
gulp.task('watch', tasks.watch);
gulp.task('html', tasks.html);
gulp.task('img', tasks.img);

gulp.task('build', gulp.series(taskNames));

gulp.task('watch', function() {
  gulp.watch('src/**/*', gulp.parallel(taskNames));
});
gulp.task('default', gulp.series(['watch']));
// gulp.task('watch', gulp.series('style', 'fonts', 'js', 'html', 'img'));
// gulp.watch('watch', 
// 	'default'
// 	// function () {
// 	//     return watch('src/*', function () {
// 	//     	gulp.series(taskNames);
// 	//     });
// 	// }
// );