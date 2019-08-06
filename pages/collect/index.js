
Page({
  data: {
    tabs: [
      { id: 0, title: '商品收藏', isActive: true },
      { id: 1, title: '品牌收藏', isActive: false },
      { id: 2, title: '店铺收藏', isActive: false },
      { id: 3, title: '浏览足迹', isActive: false }
    ],
    // 收藏商品
    collectGoods: []
  },
  // 子组件触发的事件
  handleItemChange(e) {
    // console.log(e);
    const { index } = e.detail
    const { tabs } = this.data
    tabs.forEach((v, i) => {
      index === i ? v.isActive = true : v.isActive = false
    });
    this.setData({
      tabs
    })
  },
  onLoad() {
    let collectGoods = wx.getStorageSync('collect') || [];
    this.setData({
      collectGoods
    })
  }
})