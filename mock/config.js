const fs = require('fs');
const {API_MAP} = require('../src/config/API_MAP');

const configList = [

    // === 用户相关 ===
    {
        // 登录
        url: API_MAP.login,
        type: 'get',
        customRouter: function (req, res) {

            const resulteData = fs.readFileSync(__dirname + '/db/user/login.json', 'utf-8');
            res.send(JSON.parse(resulteData))
        }

    },
    {
        // 判断是否登录
        url: API_MAP.checkLogin,
        type: 'get',
        delay: 1000,
        dataPath: '/db/user/checkLogin.json'
    },
    {
        // 获取用户信息
        url: API_MAP.getMyInfo,
        type: 'get',
        delay: 1000,
        dataPath: '/db/user/getUserInfo.json'
    },
    {
        // 获取手机号
        url: API_MAP.getPhone,
        type: 'post',
        delay: 1000,
        dataPath: '/db/user/getPhone.json'
    },
    {
        // 实名认证保存
        url: API_MAP.saveCertifyInfo,
        type: 'post',
        delay: 1000,
        dataPath: '/db/verify/verify.json'
    },
    {
        // 实名认证检查
        url: API_MAP.checkVerify,
        type: 'get',
        delay: 1000,
        dataPath: '/db/verify/checkVerify.json'
    },
    {
        url: API_MAP.savePhone,
        type: 'post',
        delay: 1000,
        dataPath: '/db/user/savePhone.json'
    },

    // === 首页 ===
    {
        // 城市列表
        url: API_MAP.getCity,
        type: 'get',
        delay: 1000,
        dataPath: '/db/getCity.json'
    },
    {
        // 根据城市获取活动
        url: API_MAP.projectList,
        type: 'get',
        delay: 2000,
        dataPath: '/db/project.json'
    },


    //  === 订单 ===
    {
        url: API_MAP.activityInitOrder,
        type: 'post',
        delay: 0,
        dataPath: '/db/order/initOrder.json'
    },
    {
        url: API_MAP.orderDetail,
        type: 'get',
        delay: 0,
        dataPath: '/db/order/orderDetail.json'
    },
    {
        url: API_MAP.cancelPay,
        type: 'post',
        delay: 1000,
        dataPath: '/db/order/cancelPay.json'
    },
    {
        url: API_MAP.orderStatus,
        type: 'get',
        delay: 1000,
        dataPath: '/db/order/orderStatus.json'
    },
    {
        // 支付成功 返回支付信息
        url: API_MAP.getSuccPayResult,
        type: 'get',
        delay: 2000,
        dataPath: '/db/order/payResult.json'
    },

    // === 券 ===
    {
        url: API_MAP.couponDetail,
        type: 'get',
        delay: 1000,
        dataPath: '/db/coupon/couponDetail.json'
    },
    {
        url: API_MAP.couponDetailConfirm,
        type: 'get',
        delay: 1000,
        dataPath: '/db/coupon/couponDetail_confirm.json'
    },
    {
        url: API_MAP.myCouponList,
        type: 'get',
        dataPath: '/db/coupon/myCouponList.json'
    },


    //  === 活动 ===
    {
        url: API_MAP.activityDetail,
        type: 'get',
        delay: 1000,
        dataPath: '/db/activityDetail.json'
    }
];

module.exports = configList;
