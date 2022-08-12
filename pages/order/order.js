// pages/order/order.js
import Storage from '../../utils/storage'
import {
  handleGetAllPrice
} from '../../common/cart'
import {
  navigateTo
} from "../../utils/navigate"
Page({
  // 获取商品信息并计算总价
  getGoodsList() {
    // 获取本地商品信息
    let carts = Storage.get("carts")
    let initCarts=Storage.get("carts")
    initCarts.length=1
    this.setData({
      goodsList: carts,
      initGoodsList:initCarts,
      allPrice:handleGetAllPrice()
    })
    if (!this.data.goodsList) return
  },
  data: {
    goodsList: [],
    initGoodsList: [],
    allPrice: 0,
    balance:4,
    showflag:false,
    switchflag: false,
    status:true
  },
  // 展开收起事件
  handleChange(){
    this.setData({
      showflag :!this.data.showflag
    })
  },
  // 判断是否可以支付减免
  handleStatus(){
    if(this.data.allPrice <= this.data.balance){
      this.setData({
        status:false
      })
    }
  },
  // 支付减免事件
  handleSwitch(event){
    this.setData({
      switchflag:event.detail.value
    })
  },
  // 确认支付事件(删除本地的商品并跳转到支付成功页面)
  handlePay(){
    // Storage.set('carts',[])
    Storage.remove("carts")
    navigateTo('/pages/success/success')
  },
  /*,*
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getGoodsList()
    this.handleStatus()
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