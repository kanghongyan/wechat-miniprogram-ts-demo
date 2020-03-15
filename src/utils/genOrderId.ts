import {fetch} from "./fetch";
import { API_MAP } from '../config/API_MAP';

/**
 * 根据活动id生成订单id
 * @param activityId
 */
export async function genOrderId(activityId) {
    const ret = await fetch.post(API_MAP.activityInitOrder, {
        activityId: activityId
    }).catch((e) => {
        wx.showModal({
            title: '',
            content: e.msg || '',
            showCancel: false
        });
        throw new Error(e)
    });
    return ret.orderId || ''
}
