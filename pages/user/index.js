// pages/user/index.js
Page({
  data: {
    // 用户信息
    userInfo: {}
  },
  onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    if(!userInfo) {
      wx.navigateTo({
        url: '/pages/login/index'
      });
      return
    }
    this.setData({
      userInfo
    })
  }
})