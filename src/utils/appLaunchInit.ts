import {login} from "./login";
import {fetch} from "./fetch";
import {API_MAP} from '../config/API_MAP';



export async function appLaunchInit(app) {


    // 登录
    const sessionId = (await login().catch(() => (''))) + '';

    if (sessionId) {
        app.globalData.sessionId = sessionId;

        if (app.loginReadyCallback) {
            app.loginReadyCallback(sessionId)
        }
    }

    // 是否已经获取了手机号
    const userInfo = await fetch.get(API_MAP.getMyInfo, {}, {autoShowLoading: false}).catch(() => ({}));
    const {mobile = '', realName = ''} = userInfo || {};

    app.globalData.mobile = mobile;
    app.globalData.realName = realName;

    if (app.userInfoReadyCallback) {
        app.userInfoReadyCallback({
            mobile: mobile,
            realName: realName
        })
    }

    if (app.userInfoReadyForBtnCallback) {
        app.userInfoReadyForBtnCallback({
            mobile: mobile
        })
    }
}
