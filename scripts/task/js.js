const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('../tsconfig.json', {
    noEmitOnError: false
});

// todo: 优化

const dist = '../miniprogram/';

function js(cb) {
    const tsResult = gulp.src("../src/**/*.ts") // or tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(dist));
}

module.exports = js;
