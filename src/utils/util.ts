export function formatTime(date: Date): string {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = (n: number) => {
    const str = n.toString();
    return str[1] ? str : '0' + str;
}

  /**
   * js简单对象转为url查询字符串key=value&
   */
const obj2UrlQuery = (obj)=> {
    var urlQurey = "";
    for (var key in obj) {
      urlQurey += key + "=" + obj[key] + "&";
    }
    if (urlQurey != "")
      urlQurey = urlQurey.substring(0, urlQurey.length - 1);
    return urlQurey;
  }
/**
 * 路由跳转
 * @param jumpWay 跳转方式
 * @param url 跳转地址
 * @param param 跳转参数
*/
export const jumpWay = (jumpWay:string,url:string,param) => {
    let urls = url;
    if (param) {
      let params = obj2UrlQuery(param)
      urls = `${url}?${params}`
    }
    wx[jumpWay]({
      url: urls ? urls : url
    })
  };

/**
 * 从wx storage中获取sessionId
 */
export function getSessionFormLocal() {
    return new Promise((resolve) => {
        wx.getStorage({
            key: 'sessionId',
            success: (res) => {
                resolve(res.data || '')
            },
            fail: () => {
                resolve('')
            }
        })
    })
}
