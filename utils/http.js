import {
  APIConfig
} from "../config/config";
import wxToPromise from './wx'
import exceptionMessage from '../config/exceptionMessage'

class Http {
  static async request({
    url,
    method = 'GET',
    data = {},
    name = 'api1'
  }, options) {
    wx.showLoading()
    try {
      const response = await wxToPromise('request', {
        url: APIConfig[name].baseURL + url,
        data,
        method,
        ...options
      })
      wx.hideLoading()
      // 请求成功
      if (response.statusCode < 400) {
        return response.data
      }
      // token过期处理
      if (response.statusCode === 401) {
        return
      }
      Http._showError(response.data.code, response.data.msg)
      return response
    } catch (error) {
      wx.hideLoading()
      _showError(-1)
      console.log(error);
    }
  }

  static _showError(code, msg) {
    let title = ''
    title = exceptionMessage[code] || msg || '发生未知错误'
    wx.showToast({
      title,
      icon: 'none',
      duration: 3000
    })
  }
}
export default Http