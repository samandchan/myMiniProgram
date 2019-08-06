// pages/user/index.js
Page({
  data: {
    // 用户信息
    userInfo: {},
    // 收藏的商品数量
    collection: 0
  },
  onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    const collection = wx.getStorageSync('collect').length;
      
    if(!userInfo) {
      wx.navigateTo({
        url: '/pages/login/index'
      });
      return
    }
    this.setData({
      userInfo,
      collection
    })
  }
})