const { isNum } = require('./math');

function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var utils = createCommonjsModule(function (module, exports) {
    var REG_NUMBER = /^([+-])?0*(\d+)(\.(\d+))?$/;
    var REG_E = /^([+-])?0*(\d+)(\.(\d+))?e(([+-])?(\d+))$/i;

    /**
     * 科学计数法转十进制
     *
     * @param {string} num 科学记数法字符串
     * @returns string
     */
    var e2ten = exports.e2ten = function (num) {
        var result = REG_E.exec(num.toString());
        if (!result) return num;
        var zs = result[2]
            , xs = result[4] || ""
            , e = result[5] ? +result[5] : 0;
        if (e > 0) {
            var _zs = xs.substr(0, e);
            _zs = _zs.length < e ? _zs + new Array(e - _zs.length + 1).join("0") : _zs;
            xs = xs.substr(e);
            zs += _zs;
        } else {
            e = -e;
            var s_start = zs.length - e;
            s_start = s_start < 0 ? 0 : s_start;
            var _xs = zs.substr(s_start, e);
            _xs = _xs.length < e ? new Array(e - _xs.length + 1).join("0") + _xs : _xs;
            zs = zs.substring(0, s_start);
            xs = _xs + xs;
        }
        zs = zs == "" ? "0" : zs;
        return (result[1] == "-" ? "-" : "") + zs + (xs ? "." + xs : "");
    };

    /**
     * 分析数字字符串
     *
     * @param {string} num NumberString
     * @returns object
     */
    exports.getNumbResult = function (num) {
        var result = REG_NUMBER.exec(num.toString());
        if (!result && REG_E.test(num.toString())) {
            result = REG_NUMBER.exec(e2ten(num.toString()));
        }
        if (result) {
            return {
                int: result[2],
                decimal: result[4],
                minus: result[1] == "-",
                num: result.slice(1, 3).join('')
            }
        }
    };


    /**
     * 检查对像属性 (非原型链)
     *
     * @param {object} obj
     * @param {string} key
     * @returns
     */
    var hasAttr = exports.hasAttr = function (obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    };

    /**
     * 扩展对像(浅复制)
     *
     * @param {object} obj
     * @param {object} obj1
     * @returns
     */
    exports.extend = function (obj) {
        var name
            , target = arguments[0] || {};
        var objs = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < objs.length; i++) {
            var _obj = objs[i];
            for (name in _obj) {
                if (hasAttr(_obj, name)) {
                    target[name] = _obj[name];
                }
            }
        }
        return target;
    };



    /**
     * 清理多余"零"
     *
     * @param {any} str
     * @param {any} zero "零"字符
     * @param {any} type 清理模式 ^ - 开头, $ - 结尾, nto1 - 多个连续变一个
     * @returns
     */
    exports.clearZero = function (str, zero, type) {
        if (str == null) return "";
        var reg0 = ~"*.?+$^[](){}|\\/".indexOf(zero) ? "\\" + zero : zero;
        var arg_s = new RegExp("^" + reg0 + "+")
            , arg_e = new RegExp(reg0 + "+$")
            , arg_d = new RegExp(reg0 + "{2}", "g");
        str = str.toString();
        if (type == "^") {
            str = str.replace(arg_s, "");
        }
        if (!type || type == "$") {
            str = str.replace(arg_e, "");
        }
        if (!type || type == "nto1") {
            str = str.replace(arg_d, zero);
        }
        return str;
    };
});

/**
 * 阿拉伯数字转中文数字
 *
 * @param {String} num 阿拉伯数字/字符串 , 科学记数法字符串
 * @param {Object} opration 转换配置
 *                          {
 *                              ww: {万万化单位 | false}
 *                              tenMin: {十的口语化 | false}
 *                          }
 * @returns String
 */
function CL(num, options) {
    var result = utils.getNumbResult(num);
    if (!result) {
        return num;
    }
    options = options ? options : {};
    var ch = this.ch             //数字
        , ch_u = this.ch_u       //单位
        , ch_f = this.ch_f || "" //负
        , ch_d = this.ch_d || "." //点
        , n0 = ch.charAt(0); //零
    var _int = result.int             //整数部分
        , _decimal = result.decimal   //小数部分
        , _minus = result.minus;      //负数标识
    var int = ""
        , dicimal = ""
        , minus = _minus ? ch_f : ''; //符号位
    var encodeInt = function encodeInt(_int, _m, _dg) {
        _int = utils.getNumbResult(_int).int;
        var int = ""
            , tenm = arguments.length > 1 ? arguments[1] : options.tenMin
            , _length = _int.length;
        //一位整数
        if (_length == 1) return ch.charAt(+_int);
        if (_length <= 4) { //四位及以下
            for (var i = 0, n = _length; n--;) {
                var _num = +_int.charAt(i);
                int += (tenm && _length == 2 && i == 0 && _num == 1) ? "" : ch.charAt(_num);
                int += (_num && n ? ch_u.charAt(n) : '');
                i++;
            }
        } else {  //大数递归
            var d = _int.length / 4 >> 0
                , y = _int.length % 4;
            //"兆","京"等单位处理
            while (y == 0 || !ch_u.charAt(3 + d)) {
                y += 4;
                d--;
            }
            var _maxLeft = _int.substr(0, y), //最大单位前的数字
                _other = _int.substr(y); //剩余数字

            int = encodeInt(_maxLeft, tenm) + ch_u.charAt(3 + d)
                + (_other.charAt(0) == '0' ? n0 : '') //单位后有0则加零
                + encodeInt(_other, tenm);
        }
        int = utils.clearZero(int, n0); //修整零
        return int;
    };

    //转换小数部分
    if (_decimal) {
        _decimal = utils.clearZero(_decimal, "0", "$"); //去除尾部0
        for (var x = 0; x < _decimal.length; x++) {
            dicimal += ch.charAt(+_decimal.charAt(x));
        }
        dicimal = dicimal ? ch_d + dicimal : "";
    }

    //转换整数部分
    int = encodeInt(_int);  //转换整数

    //超级大数的万万化
    if (options.ww && ch_u.length > 5) {
        var dw_w = ch_u.charAt(4)
            , dw_y = ch_u.charAt(5);
        var lasty = int.lastIndexOf(dw_y);
        if (~lasty) {
            int = int.substring(0, lasty).replace(new RegExp(dw_y, 'g'), dw_w + dw_w) + int.substring(lasty);
        }
    }
    return minus + int + dicimal;
}




var cn_s = {
    ch: '零一二三四五六七八九'
    ,ch_u: '个十百千万亿'
    ,ch_f: '负'
    ,ch_d: '点'
};


var encodeS = function (num, options) {
    if (!isNum(num)) return '';
    options = utils.extend({ ww: true, tenMin: true }, options);
    return CL.call(cn_s, num, options);
};

module.exports = {
    encodeS
};
