export function showModal(msg, cb?) {
    wx.showModal({
        title: '',
        content: msg || '',
        showCancel: false,
        success: (res) => {
            if (res.confirm) {
                cb && cb()
            }
        }
    });
}
