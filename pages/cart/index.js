import regeneratorRuntime from '../../lib/runtime/runtime'
import { openSetting, getSetting, chooseAddress, showModal } from '../../utils/asyncWx'
Page({
  data: {
    address: {},
    // 购物车商品
    cart: {},
    // 全选状态
    isAllChecked: false,
    // 总价
    totalPrice: 0,
    // 总数量
    totalNum: 0
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
    const cart = wx.getStorageSync('cart') || {}
    this.setData({
      address: wx.getStorageSync('address') || {},
      cart
    })
    this.setCart(cart)
  },
  // 定义方法 计算是否全选 总价 总数量
  setCart(cart) {
    // 计算全选
    let cartArr = Object.values(cart)
    let isAllChecked = cartArr.every( v => v.checked )
    // 计算总价 总数量
    let totalPrice = 0
    let totalNum = 0
    cartArr.forEach(v => {
      if(v.checked) {
        totalNum += v.num;
        totalPrice += v.goods_price * v.num ;
      }
    });
    this.setData({
      isAllChecked,
      totalNum,
      totalPrice,
      cart
    })
    wx.setStorageSync('cart', cart);
  },
  // 单选
  handleCheck(e) {
    // console.log(e);
    const {id} = e.currentTarget.dataset;
    let { cart } = this.data;
    cart[id].checked = !cart[id].checked;
    this.setCart(cart)
  },
  // 全选
  handleAllCheck() {
    let isAllChecked = ! this.data.isAllChecked
    let { cart } = this.data
    Object.keys(cart).forEach(v => {
      cart[v].checked = isAllChecked
    })
    this.setCart(cart)
  },
  // 编辑数量
  async handleEditNum(e) {
    // console.log(e);
    const { operation, id } = e.currentTarget.dataset;
    let { cart } = this.data;
    if( cart[id].num <= 1 && operation === -1 ) {
      let res = await showModal({content: '确认删除商品吗?'})
      if(res.confirm) {
        // 删除商品
        // console.log('删除商品');
        delete cart[id];
        this.setCart(cart)
      }
    }else {
      cart[id].num += operation;
      this.setCart(cart)
    }
  },
  // 结算
  handlePay() {
    // 判断 收货地址 数量
    let {address, totalNum} = this.data
    if(!address.all) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      });
      return;
    }
    if(totalNum <= 0) {
      wx.showToast({
        title: '请选择结算商品',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})