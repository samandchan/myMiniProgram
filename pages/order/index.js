import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index.js'
Page({
  data: {
    tabs: [
      {id: 0, title: '全部', isActive: true},
      {id: 1, title: '待付款', isActive: false},
      {id: 2, title: '待发货', isActive: false},
      {id: 3, title: '退款/退货', isActive: false}
    ],
    // 订单
    orderList: []
  },
  // 子组件触发的事件
  handleItemChange(e) {
    // console.log(e);
    const { index } = e.detail;
    this.setActive(index)
    // 获取订单
    this.getOrderList(index + 1)
  },
  // 定义 高亮当前标题 方法
  setActive(index) {
    const { tabs } = this.data;
    tabs.forEach((v, i) => {
      index === i ? v.isActive =  true : v.isActive = false;
    })
    this.setData({
      tabs
    })
  },
  onLoad(options) {
    console.log(options);
    this.setActive(options.type - 1)
    this.getOrderList(options.type)
  },
  onShow() {
    // console.log(this);
    // this.getOrderList(2)
  },
  // 定义 获取订单 方法
  async getOrderList(type) {
    // 先判断token
    let token = wx.getStorageSync('token');
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return
    }
    let { orders } = await request({
      url: '/my/orders/all',
      header: {Authorization: token },
      data: {type}
    })
    orders.forEach(v => {
      v.create_time_format = (new Date(v.create_time * 1000)).toLocaleString()
    })
    // console.log(res);
    this.setData({
      orderList: orders
    })
  }
})