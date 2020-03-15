const gulp = require('gulp');

// todo: 优化

const dist = '../miniprogram/';

function move (cb) {
    return gulp.src('../src/**/!(*.ts|*.scss)')
        .pipe(gulp.dest(dist))
}

module.exports = move;
