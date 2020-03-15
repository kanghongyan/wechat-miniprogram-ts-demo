/**
 * 自定义tabBar
 */
Component({
    data: {
        selected: 0,
        hidden: false,
        // 自定义的tabBar层级最高，无法在页面中覆盖。所以页面中需要有mask的地方，hasMask也需要置为true
        hasMask: false,
        color: "#BBBFC8",
        selectedColor: "#2D49D0",
        list: [{
            pagePath: "/pages/index/index",
            iconPath: "/image/icon_home.png",
            selectedIconPath: "/image/icon_home_active.png",
            text: "首页"
        }, {
            pagePath: "/pages/my/my",
            iconPath: "/image/icon_my.png",
            selectedIconPath: "/image/icon_my_active.png",
            text: "我的"
        }]
    },
    attached() {
    },
    methods: {
        switchTab(e: any) {
            const data = e.currentTarget.dataset;
            const url = data.path;
            wx.switchTab({url});
            this.setData({
                selected: data.index
            })
        },
        // getPhoneNumber() {
        //     console.log('getPhoneNumber')
        // }

    }
})
