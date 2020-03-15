/**
 * 是否为数字
 * @param num
 * @return {boolean}
 */
export const isNum = (num) => {
    return num !== undefined && num !== null && !isNaN(num) && num !== ''
};

/**
 * 将num保留digit位小数
 * @param num
 * @param digit
 * @return {string}
 */
export const toFixed = (num, digit) => {

    digit = digit < 0 ? 0 : digit;

    if (isNum(num)) {
        return Number(num).toFixed(digit)
    } else {
        return ''
    }
};

/**
 * 大数（123456）每千位加逗号（123,456）
 * @param n
 * @return {*}
 */
export const commasNumber = (n) => {
    if (!isNum(n)) return '';
    return n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")

};

/**
 * 转换为百分制 0.1 -> 10.00%
 * @param data 合法数字
 * @param n 小数位数，默认为2
 * @return {*}
 */
export const decimal2Percent = (data, n) => {
    if (!isNum(data))  return '';
    if (!isNum(n)) n = 2;
    if (n < 0) n = 0;
    return ( Math.round(data * Math.pow(10, n + 2)) / Math.pow(10, n) ).toFixed(n) + '%';
};

/**
 * 将手机号中间四位加星号
 * @param str string 手机号
 */
export const conversionPhone = (str)=>{
return str.replace(/^(\d{3})\d*(\d{4})$/,'$1****$2');
}
