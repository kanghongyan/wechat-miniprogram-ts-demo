import {showModal} from "./showModal";
import {getSessionFormLocal} from './util'
import {appLaunchInit} from './appLaunchInit'

import {IMyApp} from "../app";


// @ts-ignore
const config = require('../config/proxyPath');

type METHOD = 'GET' | 'POST';
enum FETCH_ERROR_CODE {
    // 请求失败
    'REQUEST_FAILED' = 'REQUEST_FAILED',
    // statusCode不为200
    'STATUS_NOT_200' =  'STATUS_NOT_200',
    // 服务端返回的数据格式不正确
    'RESPONSE_DATA_FORMAT_ERROR' = 'RESPONSE_DATA_FORMAT_ERROR'
}
// const HOST = 'http://192.168.51.245:8001';
const HOST = config.yigouHost || 'http://10.252.142.92:8888';

const commonConfig = {
    autoShowLoading: true
};

function _fetch(url: string, data: object, method: METHOD, config) {
    return new Promise(async (resolve, reject) => {

        if (config.autoShowLoading!) {
            // show loading
            wx.showLoading({
                title: '加载中',
                mask: true
            });
        }

        // data传object
        wx.request({
            url: `${HOST}${url}`,
            data: data,
            header: {
                'content-type': 'application/json',
                "sessionId": await getSessionFormLocal(),
                'business': 'houseEasyBuy'
            },
            method: method,
            dataType: 'json', // 返回到数据格式
            responseType: 'text', // 响应的数据类型
            success: (ret) => {

                // hide loading
                if (config.autoShowLoading) {
                    wx.hideLoading();
                }

                // statusCode 200
                if (ret.statusCode === 200) {
                    const resData = ret.data;
                    // 服务端返回的数据格式约定为object，其他的都不接收
                    if (Object.prototype.toString.call(resData) === "[object Object]") {
                        const _objectData = Object(resData);

                        if (`${_objectData.code}` === '0') {
                            // 正确响应数据
                            resolve(_objectData.data || {})
                        } else {
                            // 未登录，并且是业务接口
                            if (`${_objectData.code}` === '-1'
                                && url.indexOf('/mini/program') === -1
                            ) {
                                showModal('登录失败，请重新登录', async () => {
                                    // todo: 登录过期 展示处理为重新加载首页
                                    const app = getApp<IMyApp>();
                                    await appLaunchInit(app);
                                    wx.reLaunch({
                                        url: '/pages/index/index'
                                    })
                                })
                                // 其他情况
                            } else {
                                reject(_objectData)
                            }
                        }
                    } else {
                        wx.showToast({
                            title: '数据格式返回不正确',
                            icon: 'none'
                        });
                        reject({
                            msg: '数据格式返回不正确',
                            data: resData,
                            code: FETCH_ERROR_CODE.RESPONSE_DATA_FORMAT_ERROR
                        })
                    }
                } else {
                    // statusCode 不为200
                    wx.showToast({
                        title: `${ret.statusCode}`,
                        icon: 'none'
                    });
                    reject({
                        msg: ret.statusCode,
                        code: FETCH_ERROR_CODE.STATUS_NOT_200
                    })
                }
            },
            fail: (err) => {

                // hide loading
                if (config.autoShowLoading) {
                    wx.hideLoading();
                }


                // TODO: message 提示
                reject({
                    msg: err,
                    code: FETCH_ERROR_CODE.REQUEST_FAILED
                })
            }
        })
    })

}

const fetch = {
    // todo: fix promise type
    get: function (url: string, option?: object, config?: {autoShowLoading?: boolean}): Promise<any> {
        return _fetch(url, option || {}, 'GET', config || commonConfig)
    },
    post: function (url: string, option?: object, config?: {autoShowLoading?: boolean}): Promise<any> {
        return _fetch(url, option || {}, 'POST', config || commonConfig)
    }
};

export {
    fetch
}
