/**
 * 封装项目中用到的本地存储的方法
 */ 
  // 获取本地存储中购物车数据
  export const getStorageCart = ()=> {
    return wx.getStorageSync('cart');
  }
  // 设置本地存储购物的数据
  export const setStorageCart = (obj) => {
    wx.setStorageSync('cart', obj);
  }

