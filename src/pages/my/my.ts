import { conversionPhone } from '../../utils/math'
import { jumpWay } from '../../utils/util.js'
import { parseCouponList } from './dataDeal'
import {fetch} from "../../utils/fetch";
import {API_MAP} from '../../config/API_MAP';
import {showModal} from '../../utils/showModal'
import {IMyApp} from "../../app";

const app = getApp<IMyApp>();

const PAGE_SIZE = 10;

Component({
    data: {
        phoneNumber: '',
        realName: "",
        couponList: {
            pageNum: 0,
            total: 0,
            list: [],
            hasMore: true,
            searchFinished: false
        }
    },
    methods: {
        onLoad() {

            // onLoad生命周期执行就不需要RefreshList了
            app.globalData.pageMyOnShowRefreshList = false;

            if (app.globalData.mobile) {
                this.setData({
                    realName: app.globalData.realName,
                    phoneNumber: conversionPhone(app.globalData.mobile)
                });

                this._getMyCoupons({currentPage: 1});

            } else {
                app.userInfoReadyCallback = ({realName, mobile}) => {
                    this.setData({
                        realName: realName,
                        phoneNumber: conversionPhone(mobile)
                    });

                    mobile && this._getMyCoupons({currentPage: 1})
                }
            }

        },
        onShow() {
            // 设置tab选中
            this._setBar({selected: 1});
            // 刷新列表
            this._needRefreshList();


        },
        /**
         * 上拉触底
         */
        onReachBottom() {
            const curPageNum = this.data.couponList.pageNum;
            const total = this.data.couponList.total;

            if (curPageNum * PAGE_SIZE >= total) {
                this.setData({
                    'couponList.hasMore': false
                });
                return
            }

            this._getMyCoupons({pageNum: curPageNum + 1})
        },
        /**
         * 下拉刷新
         */
        async onPullDownRefresh() {
            // 获取用户信息
            const {realName = '', mobile = ''} = await fetch.get(API_MAP.getMyInfo, {})
                .catch((e) => {
                    showModal(e.msg);
                    return {}
                });

            this.setData({
                realName: realName,
                phoneNumber: conversionPhone(mobile)
            });

            // 获取易购券列表
            mobile && this._getMyCoupons({currentPage: 1});

            wx.stopPullDownRefresh()
        },
        /**
         * 单条资产跳转
         * @param e
         */
        bindViewTap(e) {
            jumpWay('navigateTo',
            '/packageMy/pages/yigouCouponDetail/detail',
             { id: e.currentTarget.dataset.id })
        },
        async handleGetPhone(e) {
            const detail = e.detail || {};
            this.setData({
                phoneNumber: conversionPhone(detail.mobile || '')
            });

            this._getMyCoupons({pageNum:1})

        },
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
         * 获取我的易购券
         * @param currentPage
         * @private
         */
        async _getMyCoupons({pageNum = 1}) {

            const curList = this.data.couponList.list.slice();

            const ret = await parseCouponList(pageNum, PAGE_SIZE);

            const newList = pageNum === 1 ? (ret.list || []) : curList.concat(ret.list);

            this.setData({
                'couponList.list': newList,
                'couponList.pageNum': pageNum,
                'couponList.total': ret.total,
                'couponList.searchFinished': true,
                'couponList.hasMore': !(pageNum * PAGE_SIZE >= ret.total)
            })

        },
        _needRefreshList() {
            if (app.globalData.pageMyOnShowRefreshList) {
                app.globalData.pageMyOnShowRefreshList = false;
                this._getMyCoupons({currentPage: 1})
            }
        }
    },

});
