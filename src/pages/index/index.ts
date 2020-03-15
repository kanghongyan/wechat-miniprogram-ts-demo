import { getCity, getActivies } from './dataDeal'
import {IMyApp} from "../../app";

const app = getApp<IMyApp>();


const PAGE_SIZE = 10;

interface IIndexData {
    showCityPanel: boolean,
    showPageMask: boolean,
    curCity: {
        code: string,
        name: string
    },
    cityList: object[],
    actList: {
        pageNum: number,
        total: number,
        list: object[],
        hasMore: boolean,
        searchFinished: boolean
    },
    inputValue: string
}


Component<{}, IIndexData>({
    data: {
        showCityPanel: false,
        showPageMask: false,

        // 当前城市
        curCity: {
            code: '',
            name: ''
        },
        // 开通的城市列表
        cityList: [{}],
        // 搜索输入的内容
        inputValue: '',
        // 活动列表
        actList: {
            pageNum: 0,
            total: 0,
            list: [],
            hasMore: true,
            searchFinished: false
        }
    },
    pageLifetimes: {
        show: function() {
        }
    },
    methods: {
        async onLoad() {

            if (app.globalData.sessionId) {
                // 地理位置信息
                await this._initCity();
                // 请求楼盘信息
                await this._fetchAct({pageNum: 1});

            } else {

                app.loginReadyCallback = async () => {
                    // 地理位置信息
                    await this._initCity();
                    // 请求楼盘信息
                    await this._fetchAct({pageNum: 1});
                }
            }




        },
        onShow() {
            // 设置tab选中
            this._setBar({selected: 0});
        },
        /**
         * 上拉触底
         */
        onReachBottom() {
            const curPageNum = this.data.actList.pageNum;
            const total = this.data.actList.total;


            if (curPageNum * PAGE_SIZE >= total) {
                this.setData({
                    'actList.hasMore': false
                });
                return
            }


            this._fetchAct({pageNum: curPageNum + 1});
        },
        /**
         * 下拉刷新
         */
        async onPullDownRefresh() {
            // data
            if (!this.data.curCity.code) {
                await this._initCity();
            }
            await this._fetchAct({pageNum: 1});

            wx.stopPullDownRefresh()
        },
        /**
         * 点击城市切换tab
         */
        handleSwitchCity(e) {
            const dataset = e.currentTarget.dataset || {};
            const isShow = dataset.show;

            this._switchCityPanelShow(!isShow);
        },
        /**
         * 点击item,跳转到详情页面
         */
        onItemClick(e) {
            const dataset = e.target.dataset || {};
            const id = dataset.id || '';
            wx.navigateTo({
                url: `../projectDetail/projectDetail?id=${id}`
            })
        },
        /**
         * 搜索
         */
        handleSearch(e) {
            const detail = e.detail || {};
            const value = detail.value || '';

            this.setData({
                inputValue: value
            });

            this._fetchAct({pageNum: 1});
            this._switchCityPanelShow(false);
        },
        /**
         * 点击mask，隐藏
         */
        handleMaskTap() {
            this._switchCityPanelShow(false);
        },
        /**
         * 选择城市
         */
        handleSelectCity(e) {

            const detail = e.detail || {};

            this.setData({
                'curCity.code': detail.code || '',
                'curCity.name': detail.name || ''
            });

            this._fetchAct({pageNum: 1});
            this._switchCityPanelShow(false)
        },

        /**
         * 获取城市
         * @private
         */
        async _initCity() {
            const ret = await getCity();

            this.setData({
                curCity: ret.curCity,
                cityList: ret.cityList
            })

        },
        // _getGeo() {
        //     wx.getLocation({
        //         success: (res) => {
        //             // todo: 获取位置成功
        //             console.log(res);
        //             this.setData!({
        //                 city: `${res.accuracy}` || ''
        //             })
        //         },
        //         fail: (e) => {
        //             // todo: 获取位置失败
        //             console.log(e)
        //         }
        //     })
        // },
        /**
         * 设置tabbar
         * @param option
         * @private
         */
        _setBar(option: {selected?: number, hidden?: boolean, hasMask?: boolean}) {

            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar()!.setData(option)
            }
        },
        /**
         * 请求活动信息
         * @private
         */
        async _fetchAct({pageNum = 1}) {

            const curList =  this.data.actList.list.slice();

            const ret = await getActivies(
                this.data.curCity.code,
                this.data.inputValue,
                pageNum
            );

            // @ts-ignore
            const newList = pageNum === 1 ? ret.list : curList.concat(ret.list);

            this.setData({
                'actList.list': newList,
                'actList.pageNum': pageNum,
                'actList.total': ret.total,
                'actList.searchFinished': true,
                'actList.hasMore': !(pageNum * PAGE_SIZE >= ret.total)
            });


        },
        /**
         * 切换城市选择面板显示隐藏
         * @param isShow
         * @private
         */
        _switchCityPanelShow(isShow) {
            this.setData({
                showCityPanel: isShow,
                showPageMask: isShow
            });
            this._setBar({hasMask: isShow})

        },
    }

});
