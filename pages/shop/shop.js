// pages/shop/shop.js
import {
  getShopCode
} from '../../common/cart'
import ShopModel from '../../model/shop'
import {
  navigateTo
} from "../../utils/navigate"
import Storage from '../../utils/storage'
Page({

  // 获取轮播图数据
  async getBannerData() {
    const response = await ShopModel.getShopBanner()
    this.setData({
      bannerData: response.data
    })
  },
  // 点击扫码事件
  async handleSaoCode(event) {
    if (this.data.status) {
      navigateTo("/pages/order/order")
      return
    }
    await getShopCode(event)
    // 跳转到购物车页面
    navigateTo('/pages/cart/cart')
  },
  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [],
    goodsList: [],
    status: false,
    count: 0
  },
  /**
   * 初始化获取商品数据
   */
  getGoodsList() {
    const goodsList = Storage.get("carts")
    const status = goodsList.length > 0 ? true : false
    let count = 0
    if (goodsList) {
      goodsList.forEach(item => {
        count += item.num
      });
    }
    this.setData({
      goodsList,
      status,
      count
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBannerData()
    this.getGoodsList()
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
    this.getGoodsList()
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