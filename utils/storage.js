class Storage {
  // 设置本地存贮的数据
  static set(key, value) {
    wx.setStorageSync(key, value)
  }
  // 获取本地的数据
  static get(key) {
    return wx.getStorageSync(key)
  }
  // 删除本地的数据
  static remove() {
    wx.removeStorageSync()
  }
  // 清空本地的数据
  static removeAll() {
    wx.clearStorageSync()
  }
}

export default Storage