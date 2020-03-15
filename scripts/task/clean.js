const del = require('del');

const dist = '../miniprogram/';

function clean(cb) {
    del.sync([dist], {force: true});
    cb()
}

module.exports = clean;
