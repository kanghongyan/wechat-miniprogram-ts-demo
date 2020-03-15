import { API_MAP } from '../config/API_MAP'
import { fetch } from './fetch'
import { getSessionFormLocal } from './util'

/**
 * 判断wx.checkSession是否过期
 * @private
 */
function _isWXSessionValid() {
    return new Promise((resolve) => {
        wx.checkSession({
            success () {
                //session_key 未过期，并且在本生命周期一直有效
                console.log('isWXSessionValid: true');
                resolve(true)
            },
            fail () {
                // session_key 已经失效，需要重新执行登录流程
                console.log('isWXSessionValid: false');
                resolve(false)
            }
        })
    })
}

/**
 * 判断server session是否过期
 * @private
 */
function _isServerSessionValid() {
    return new Promise(async (resolve) => {
        // 请求成功，code 0时表示有效, ret此时为{}
        const ret = await fetch.get(API_MAP.checkLogin).catch((e) => {
            return e
        });

        resolve(!ret.code)
    })
}

export async function login() {

    const sessionId = await getSessionFormLocal();

    if (sessionId && await _isWXSessionValid() && await _isServerSessionValid()) {
        return sessionId;
    }

    return new Promise((resolve, reject) => {
        wx.login({
            success: (res) => {
                // login
                fetch.get(API_MAP.login, {code: res.code})
                    .then((data) => {

                        if (!data.sessionId) {
                            wx.showToast({
                                title: "sessionId为空",
                                icon: 'none'
                            });
                            reject('sessionId为空');
                            return
                        }
                        wx.setStorage({
                            key: 'sessionId',
                            data: data.sessionId,
                            success: () => {
                                resolve(data.sessionId)
                            },
                            fail: () => {
                                reject('setSessionId 失败')
                            }
                        })
                    })
                    .catch((e) => {
                        reject(e.msg || '登录失败')
                    })
            }
        })
    })




}
