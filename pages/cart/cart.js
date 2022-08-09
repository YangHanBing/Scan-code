// pages/cart/cart.js
import Storage from '../../utils/storage'
import {
  navigateTo
} from "../../utils/navigate"
import {
  getShopCode
} from '../../common/cart'
Page({
  // 实训商品数量增加
  bindPlus(event) {
    this.handleComputedCount(event, 'increment')
    this.handleGetAll()
  },
  // 实现商品数量减少
  bindMinusj(event) {
    this.handleComputedCount(event, 'decrement')
    this.handleGetAll()
  },
  // 计算商品价格
  handleComputedCount(event, action) {
    const _index = event.currentTarget.dataset.index
    action === 'increment' ? this.data.goodsList[_index].num += 1 : this.data.goodsList[_index].num -= 1
    if (this.data.goodsList[_index].num <= 0) {
      this.data.goodsList[_index].num = 1
      this.handleDelCart(_index)
      return
    }
    this.setData({
      goodsList: this.data.goodsList
    })
    Storage.set("carts", this.data.goodsList)
  },
  // 商品数量 < 1 的事件
  handleDelCart(index) {
    // 如果商品数量小于1时删除本地的当前的商品
    wx.showModal({
      title: '提示',
      content: '您确定要删除这个商品吗？',
      success: (res) => {
        if (res.confirm) {
          this.data.goodsList.splice(index, 1)
          this.setData({
            goodsList: this.data.goodsList
          })
          Storage.set("carts", this.data.goodsList)
          this.handleGetAll()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 计算所有商品的总价和·总量
  handleGetAll() {
    let allPrice = 0
    let allNum = 0
    this.data.goodsList.forEach(item => {
      allPrice += ((item.price * 10) * item.num) / 10
      allNum += item.num
    });
    // 将价格四舍五入到指定位数
    allPrice.toFixed(1)
    this.setData({
      allPrice,
      allNum
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    allPrice: 0,
    allNum: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad(options) {
    this.getGoodsList()
  },
  // 获取·商品信息并计算总价
  getGoodsList() {
    // 获取本地商品信息
    let carts = Storage.get("carts")
    this.setData({
      goodsList: carts
    })
    if (!this.data.goodsList) return
    //  计算总价
    this.handleGetAll()
  },
  // 继续添加事件（调用扫码功能）
  handleReAdd() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        const event = {
          detail: res.result
        }
        getShopCode(event)
        this.getGoodsList()
      }
    })
  },
  // 去支付事件（跳转到支付页面）
  handleToOrder() {
    navigateTo('/pages/order/order')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})