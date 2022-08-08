// pages/cart/cart.js
import Storage from '../../utils/storage'
import {navigateTo} from "../../utils/navigate"
Page({
  // 获取当前点击商品的信息
  hasCartData(event){
    //先获取当前所点击元素的下标
    let idx = event.currentTarget.dataset.index
    //获取到购物车的所有数据
    let cartData = this.data.goodsList
    console.log(cartData);
    //如果购物车的数据不存在,则不继续往下执行
    if(!cartData) return;

    return {idx,cartData}
  },
  // 实训商品数量增加
  bindPlus(event){
    let {idx,cartData} = this.hasCartData(event)
    //让当前所点击对应的下标的数据的num + 1  [ {},{}]
    cartData[idx].num +=1;
    this.setData({
      goodsList : cartData
    })
    Storage.set("carts",cartData)
    this.handleGetAll(cartData)
  },
  // 实现商品数量减少
  bindMinusj(event){
    let {idx,cartData} = this.hasCartData(event)
    console.log(idx,cartData)
    // 如果商品数量小于0时删除本地的当前的商品
    if(cartData[idx].num <= 1){
      wx.showModal({
        title: '提示',
        content: '您确定要删除这个商品吗？',
        success : (res) =>{
          if (res.confirm) {
            cartData.splice(idx,1)
            console.log(cartData)
            this.setData({
              goodsList : cartData
            })
            Storage.set("carts",cartData)
            this.handleGetAll(cartData)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      cartData[idx].num -=1;
    }
    this.setData({
      goodsList : cartData
    })
    Storage.set("carts",cartData)
    this.handleGetAll(cartData)
  },
  // 计算所有商品的总价和·总量
  handleGetAll(goodsList){
    let allPrice = 0
    let allNum = 0
    goodsList.forEach(item => {
      allPrice += ((item.price*10)*item.num)/10
      allNum += item.num
    });
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
    allPrice:0,
    allNum:0
  },
  // 继续添加事件（跳转到shop页面）
  handleReAdd(){
    wx.switchTab({
      url:'/pages/shop/shop'
    })
  },
  // 去支付事件（跳转到支付页面）
  handleToPay(){
    navigateTo('/pages/pay/pay')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取本地商品信息
    let carts = Storage.get("carts")
    this.setData({goodsList:carts})
    if(!this.data.goodsList) return
    //  计算总价
    this.handleGetAll(this.data.goodsList)
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