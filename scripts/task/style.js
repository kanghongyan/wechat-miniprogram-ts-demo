const gulp = require('gulp');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
// todo: 优化

const dist = '../miniprogram/';

sass.compiler = require('node-sass');

function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src("../src/**/*.scss")

            // Use sass with the files found, and log any errors
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                // 不美化属性值
                cascade: false
            }))
            .pipe(rename(function (path) {
                path.extname = ".wxss";
            }))
            // What is the destination for the compiled file?
            .pipe(gulp.dest(dist))
    );
}

module.exports = style;
