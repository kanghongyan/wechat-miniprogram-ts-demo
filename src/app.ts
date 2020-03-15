import { appLaunchInit } from './utils/appLaunchInit'

//app.ts
export interface IMyApp {
    // 注意：这些callback只允许被赋值一次，开发中注意避免被覆盖
    loginReadyCallback?(sessionId?: string): void,
    userInfoReadyCallback?(option: { mobile: string, realName: string }): void,
    userInfoReadyForBtnCallback?(option: {mobile: string}): void,

    _checkUpdate(): void

    globalData: {
        userInfo?: wx.UserInfo,
        sessionId: string,
        mobile: string,
        realName: string,
        // 进入"我的"页面onShow时，是否重新请求数据
        pageMyOnShowRefreshList: boolean
    }
}

// 整个小程序只有一个App实例
App<IMyApp>({
    // 小程序启动之后触发
    async onLaunch() {

        // 检查版本跟新
        this._checkUpdate();

        appLaunchInit(this);

        // 获取用户信息
        // wx.getSetting({
        //     success: (res) => {
        //         if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             wx.getUserInfo({
        //                 success: res => {
        //                     // 可以将 res 发送给后台解码出 unionId
        //                     console.log(res.userInfo)
        //                     this.globalData.userInfo = res.userInfo
        //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                     // 所以此处加入 callback 以防止这种情况
        //                     if (this.userInfoReadyCallback) {
        //                         this.userInfoReadyCallback(res.userInfo)
        //                     }
        //                 }
        //             })
        //         }
        //     }
        // })
    },
    globalData: {
        sessionId: '',
        mobile: '',
        realName: '',
        pageMyOnShowRefreshList: false
    },
    onShow(): void {
        // console.log(option)
    },
    onHide(): void {
    },
    onError(error?: string): void {
        console.log('小程序发生错误');
        console.log(error)
    },
    /**
     * 页面找不到时候会触发
     * @param res
     */
    onPageNotFound(res?: App.IPageNotFoundOption): void {
        console.log(res);
        wx.redirectTo({
            url: 'pages/index/index'
        })
    },
    /**
     * 检查版本更新
     * @private
     */
    _checkUpdate() {
        const updateManager = wx.getUpdateManager();

        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(`new version: ${res.hasUpdate}`)
        });

        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success(res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        });

        updateManager.onUpdateFailed(function () {
            // 新版本下载失败
        })
    }
});
