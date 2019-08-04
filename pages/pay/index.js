// pages/pay/index.js
Page({
  data: {
    address: {},
    // 购物车商品
    cart: {},
    // 总价
    totalPrice: 0,
    // 总数量
    totalNum: 0
  },
  onShow() {
    const cart = wx.getStorageSync('cart') || {}
    this.setData({
      address: wx.getStorageSync('address') || {},
      cart
    })
    // 计算总价 数量
    let totalNum = 0;
    let totalPrice = 0;
    let cartArr = Object.values(cart)
    cartArr.forEach(v => {
      if(v.checked) {
        totalNum += v.num;
        totalPrice += v.goods_price * v.num;
      }
    })
    this.setData({
      totalNum,
      totalPrice
    })
  },
})