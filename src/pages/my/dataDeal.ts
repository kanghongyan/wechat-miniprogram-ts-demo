import { fetch } from '../../utils/fetch'
import { API_MAP } from '../../config/API_MAP'
import { commasNumber } from '../../utils/math'

export async function parseCouponList(pageNo, pageSize) {

    const ret = await fetch.get(API_MAP.myCouponList, {
        currentPage: pageNo,
        pageSize: pageSize
    }).catch(() => ({}));

    const couponList = ret.list  ? ret.list.map((item) => {

        const deductDesc = item.deductDesc || '';
        const amt = item.payAmount / 100;

        return {
            projectName: item.projectName || '',
            deductDesc: deductDesc,
            id: item.couponId || '',
            status: item.couponStatus || -1,
            amt: commasNumber(amt),
            deductInfo: ['']
        }
    }) : [];

    return {
        list: couponList,
        total: ret.total || 0
    }
}
