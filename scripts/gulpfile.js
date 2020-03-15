const gulp = require('gulp');
const { parallel, watch, series } = require('gulp');


// todo: 优化

const setConfig = require('./task/customEnv');
const move = require('./task/move');
const style = require('./task/style');
const js = require('./task/js');
const clean = require('./task/clean');



function sassWatch(cb) {
   watch('../src/**/*.scss', {ignoreInitial: false}, style)
}
function jsWatch() {
    watch('../src/**/*.ts', {ignoreInitial: false}, js)
}
function moveWatch() {
    watch('../src/**/!(*.ts|*.scss)', {ignoreInitial: false}, gulp.series(move, setConfig))
}



exports.default = series(clean, parallel(
    sassWatch,
    jsWatch,
    moveWatch
));
