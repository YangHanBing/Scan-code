import {
  APIConfig
} from "../config/config";
import wxToPromise from './wx'
import exceptionMessage from '../config/exceptionMessage'

class Http {
  static async request({
    url,
    method = 'GET',
    data = {}
  }, options) {
    const response = await wxToPromise('request', {
      url: APIConfig.baseURL + url,
      data,
      method,
      ...options
    })
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