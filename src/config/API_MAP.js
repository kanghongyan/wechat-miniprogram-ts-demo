const GATEWAY_PREFIX = '/mini/program';
const { yigouHost } = require('./proxyPath');


const API_MAP = {
    'login': `${GATEWAY_PREFIX}/slient/login`,
    'checkLogin': `${GATEWAY_PREFIX}/check/login`,
    'getPhone': `${GATEWAY_PREFIX}/decrypt/data`,

    'savePhone': '/house/customer/user/v1/register',

    'getCity': '/house/customer/activity/v1/city/init',
    'projectList': '/house/customer/activity/v1/list',

    // 保存用户实名认证
    'saveCertifyInfo': `/house/customer/user/v1/certify/save`,
    'checkVerify': `/house/customer/user/v1/certify/check`,

    // 订单
    'orderDetail': '/house/customer/order/v1/detail/get',
    'cancelPay': '/house/customer/order/v1/cancel',
    'orderStatus': '/house/customer/order/v1/status/get',
    // 支付成功页面，展示支付结果
    'getSuccPayResult': `/house/customer/order/v1/success/get`,

    // 易购券
    'couponDetail': `/house/customer/coupon/v1/detail/get`,
    'couponDetailConfirm': `/house/customer/coupon/v1/confirm`,
    'myCouponList': '/house/customer/coupon/v1/list',

    // 活动
    'activityDetail': `/house/customer/activity/v1/detail`,
    'activityInitOrder': `/house/customer/order/v1/buy`,
    // 我的 实名认证
    'getMyInfo':"/house/customer/user/v1/info/get",

    // 协议html链接
    // todo: 放到服务器上还是cdn上？
    'terms': `${yigouHost}/static/yigou_protocol.html`
};

module.exports = {
    API_MAP: API_MAP
};
