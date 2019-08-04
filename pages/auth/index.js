import { login } from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index.js'

Page({
  async handleGetUserInfo(e) {
    // console.log(e);
    const { encryptedData, rawData, iv, signature } = e.detail;
    // 获取 code
    // const res = await login() 
    // console.log(res);
    const { code } = await login()
    // 获取 token
    const { token } = await request({
      url: '/users/wxlogin',
      method: 'post',
      data: {encryptedData, rawData, iv, signature, code}
    })
    // console.log(res2);
    wx.setStorageSync('token', token);
    wx.navigateBack({
      delta: 1
    });
  }
})