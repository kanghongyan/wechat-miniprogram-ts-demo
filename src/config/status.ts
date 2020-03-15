/**
 * 订单状态
 */
export const ORDER_STATUS = {
    DEALING: -1,

    INIT: '1',
    EXPIRED: '2',
    SUCCESS: '3',
    REFUND_DEALING: '4',
    REFUND_FAIL: '5',
    REFUNDED: '6'
};

/**
 * 易购券状态
 */
export const YIGOU_COUPON_STATUS = {
    UNUSED: 1,
    UNCONFIRMED: 2,
    USED: 3,
    REFUND_DEALING: 4,
    REFUNDED: 5
};

/**
 * 实名认证状态
 */
export const VERIFY_STATUS = {
    VERIFIED: 1,
    UN_VERIFY: 0
};
