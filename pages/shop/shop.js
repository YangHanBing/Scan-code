// pages/shop/shop.js
import ShopModel from '../../model/shop'
import {
  addCart
} from "../../common/cart"
import {navigateTo} from "../../utils/navigate"
Page({

  // 获取轮播图数据
  async getBannerData() {
    const response = await ShopModel.getShopBanner()
    this.setData({
      bannerData: response.data
    })
  },
  // 点击扫码事件
  async getShopCode(event) {
    // 商品条形码
    const qcode = event.detail
    if (!qcode) return
    try {
      // 调用获取商品信息接口
      const response = await ShopModel.getGoodsInfo(qcode)
      if (!response.success) return
      // 获取商品信息
      const result = response.result
      // 如果获取的商品信息长度 < 0 ，则不向下执行
      if (result.length <= 0) return
      // 将商品信息添加的本地
      addCart(result[0])
      // 跳转到购物车页面
      navigateTo('/pages/cart/cart')
    } catch (err) {
      console.log(err);
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    bannerData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBannerData()
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