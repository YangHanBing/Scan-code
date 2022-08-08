import Storage from "../utils/storage";
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
export {
  addCart
}