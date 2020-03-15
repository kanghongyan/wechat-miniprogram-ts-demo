const gulp = require('gulp');
const { parallel, series } = require('gulp');

// todo: 优化

const setConfig = require('./task/customEnv');
const move = require('./task/move');
const style = require('./task/style');
const js = require('./task/js');
const clean = require('./task/clean');



exports.default = series(clean, parallel(
    style,
    js,
    gulp.series(move, setConfig)
));
