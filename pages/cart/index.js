import regeneratorRuntime from '../../lib/runtime/runtime'
import { openSetting, getSetting, chooseAddress } from '../../utils/asyncWx'
Page({
  data: {
    address: {},
    // 购物车商品
    cart: {}
  },
  async handleChooseAddress() {
    const res1 = await getSetting()
    // console.log(res1);
    // console.log(res1.authSetting["scope.address"]);
    if(res1.authSetting["scope.address"]===false) {
      await openSetting()
    }
    const res2 = await chooseAddress() 
    console.log(res2);
    res2.all = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo
    wx.setStorageSync('address', res2);
    this.setData({
      address: res2
    })
  },
  onShow() {
    this.setData({
      address: wx.getStorageSync('address') || {},
      cart: wx.getStorageSync('cart') || {}
    })
  },

})