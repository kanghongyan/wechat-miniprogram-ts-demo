const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const inject = require('gulp-inject');

// todo: 优化\环境变量
// console.log(path.resolve('../src/config/proxyPath'))
console.log(process.env.NODE_ENV)

const configFile = (function () {
    if (process.env.NODE_ENV === 'development') {
        return path.resolve('../config/development')
    }
    if (process.env.NODE_ENV === 'test') {
        return path.resolve('../config/test')
    }
    if (process.env.NODE_ENV === 'production') {
        return path.resolve('../config/production')
    }
    return path.resolve('../config/development')
})();

function setEnv() {
    return gulp.src(path.resolve('../src/config/proxyPath.js'))
        .pipe(inject(gulp.src(configFile), {
            starttag: '/* inject:analytics */{',
            endtag: '}',
            transform: function (filepath, file, i, length) {
                // console.log('\'' + filepath + '\'' + (i + 1 < length ? ', ' : ''))
                return fs.readFileSync(configFile).toString()
            }
        }))
        .pipe(gulp.dest(path.resolve('../miniprogram/config/')));
}

module.exports = setEnv;
