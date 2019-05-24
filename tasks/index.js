const gulp = require('gulp');
const path = require("path");
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer'); 
const uglify = require('gulp-uglify');
Promise = require('bluebird');
// const browserSync = require("browser-sync").create();

const rootDIR = global.__basedir;
const entryDIR = 'src';
const outputDIR = 'dist';

const javascriptFILES = ['script.js'];
const javascriptDIR = 'js';
const jsTask = function() {
    const out_path = path.join(rootDIR, outputDIR, javascriptDIR);
    let output = '';

    return Promise.map( javascriptFILES, async item => {
        output += item + '\n';

        await browserify({
            entries: [
                path.join(rootDIR, entryDIR, javascriptDIR, item)
            ]
        })
        .transform( babelify, { presets: ['@babel/env']})
        .bundle()
        .pipe( source( item))
        .pipe( rename({
            extname: '.min.js'
        }))
        .pipe( buffer())
        .pipe( sourcemaps.init({
            loadMaps: true
        }))
        .pipe( uglify())
        .pipe( sourcemaps.write( './'))
        .pipe( gulp.dest( out_path));
    })
    .then(function() {
        console.log('output', output);
    });   
};
module.exports.js = jsTask;

const sassFILE = 'styles.scss';
const sassDIR = 'scss';
const stylesDIR = 'css';
const styleTask = function () {
    const in_path = path.join(rootDIR, entryDIR, sassDIR);
    const out_path = path.join(rootDIR, outputDIR, stylesDIR);
    const file_path = `${in_path}/${sassFILE}`;
    return gulp.src( file_path)
        .pipe( sourcemaps.init())
        .pipe( sass( {
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on( "error", console.error.bind(console))
        .pipe( prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe( rename( { 
            suffix: '.min',
            extname: '.css'
        }))
        .pipe( sourcemaps.write('./'))
        .pipe( gulp.dest( out_path));
};
module.exports.style = styleTask;

const fontDIR = 'fonts';
const fontTask = function () {
    const in_path = path.join(rootDIR, entryDIR, fontDIR);
    const out_path = path.join(rootDIR, outputDIR, fontDIR);
    console.log('fonts',in_path, `${in_path}/*`)
    return gulp.src( `${in_path}/*`)
        .pipe( gulp.dest( out_path));
};
module.exports.fonts = fontTask;

const htmlDIR = 'templates';
const htmlTask = function () {
    const in_path = path.join(rootDIR, entryDIR, htmlDIR);
    const out_path = path.join(rootDIR, outputDIR);
    return gulp.src( `${in_path}/*`)
        .pipe( gulp.dest( out_path));
};
module.exports.html = htmlTask;

const imgDIR = 'img';
const imgTask = function () {
    const in_path = path.join(rootDIR, entryDIR, imgDIR);
    const out_path = path.join(rootDIR, outputDIR, imgDIR);
    return gulp.src( `${in_path}/*`)
        .pipe( gulp.dest( out_path));
};
module.exports.img = imgTask;

const watchTask = async function () {
    const js_path = path.join(rootDIR, entryDIR, javascriptDIR);
    const style_path = path.join(rootDIR, entryDIR, sassDIR);
    
    console.log(js_path);
    console.log(style_path);
    
    gulp.watch( js_path, gulp.series('js'));
    gulp.watch( style_path, gulp.series('style'));
};
module.exports.watch = watchTask;


// const browserWatch = gulp.parallel( function() {
//     const js_path = path.join(__dirname, entryDIR, javascriptDIR);
//     const style_path = path.join(__dirname, entryDIR, sassDIR);
    
//     console.log(js_path);
//     console.log(style_path);
    
//     gulp.watch( js_path, gulp.series('js'));
//     gulp.watch( style_path, gulp.series('style'));
// }, browserSync));

