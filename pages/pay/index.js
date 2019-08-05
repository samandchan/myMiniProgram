import {
  request
} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
import {
  requestPayment,
  showToast
} from '../../utils/asyncWx.js'
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
      if (v.checked) {
        totalNum += v.num;
        totalPrice += v.goods_price * v.num;
      }
    })
    this.setData({
      totalNum,
      totalPrice
    })
  },
  // 支付
  async handlePay() {
    // try {

    // } catch (error) {
    //   // console.log(error);
    //   // await showToast({
    //   //   title: '支付失败',
    //   //   icon: 'none'
    //   // })
    // }


    // 创建订单 先获取token 值
    let token = wx.getStorageSync('token');
    console.log(token);
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return
    }
    let {
      cart,
      totalPrice,
      address
    } = this.data
    let goods = []
    Object.values(cart).forEach(v => {
      if (v.checked) {
        goods.push( {
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        } )
      }
    })
    console.log(goods);
    const {
      order_number
    } = await request({
      url: '/my/orders/create',
      method: 'post',
      header: {
        Authorization: token
      },
      data: {
        order_price: totalPrice,
        consignee_addr: address.all,
        goods
      }
    })
    console.log(order_number);
    // 获取支付参数
    const {
      pay
    } = await request({
      url: '/my/orders/req_unifiedorder',
      method: 'post',
      header: {
        Authorization: token
      },
      data: {
        order_number
      }
    })
    // console.log(res);
    // 发起微信支付
    const res = await requestPayment(pay)
    // console.log(res);
    // 查看订单支付状态
    const res2 = await request({
      url: '/my/orders/chkOrder',
      method: 'post',
      header: {
        Authorization: token
      },
      data: {
        order_number
      }
    })
    // let newCart = Object.values(cart).filter(v => {
    //   return v.checked !== true
    // })
    Object.keys(cart).forEach(v => {
      if (cart[v].checked) {
        delete cart[v]
      }
    })
    wx.setStorageSync('cart', cart);
    // console.log(res2);
    await showToast({
      title: res2
    })
    // 跳转到订单列表页面
    wx.navigateTo({
      url: '/pages/order/index'
    });
  }
})