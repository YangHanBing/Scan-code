import Storage from "../utils/storage";
import ShopModel from '../model/shop'

// 将商品信息添加到本地
const addCart = (data) => {
  const cartArray = []
  if (!hasLocalData()) {
    data.num = 1
    cartArray.push(data)
    Storage.set('carts', cartArray)
  } else {
    const localData = Storage.get('carts')
    if (hasShopData(data, localData)) {
      localData.forEach(item => {
        if (item._id === data._id) {
          item.num += 1
        }
      });
    } else {
      data.num = 1
      localData.push(data)
    }
    Storage.set('carts', localData)
    return localData
  }
}
// 判断本地有没有商品信息
const hasLocalData = () => {
  const carts = Storage.get("carts")
  const status = carts ? true : false
  return status;
}
// 判断当前要添加的商品在本地是否存在
const hasShopData = (data, localData) => {
  const _data = localData.filter(item => {
    return item._id === data._id
  })
  return _data.length > 0 ? true : false
}
// 开启扫码功能
const getShopCode = async (event) => {
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
    if (result.length <= 1)
    // 将商品信息添加的本地
    var data = addCart(result[0])
    return data
  } catch (err) {
    console.log(err);
  }
}
// 计算商品总价
const handleGetAllPrice=()=> {
  let allPrice = 0
  const goodsList = Storage.get("carts")
  goodsList.forEach(item => {
    allPrice += ((item.price * 10) * item.num) / 10
  });
  // 将价格四舍五入到指定位数
  allPrice.toFixed(1)
  return allPrice
}
export{
  getShopCode,
  handleGetAllPrice
}