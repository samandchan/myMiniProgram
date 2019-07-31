import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧
    leftMenuList: [],
    // 右侧
    rightGoodsList: [],
    // 菜单索引
    current: 0,
    // 滚动条距离
    scrollTop: 0
  },
  // 储备数据
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryList()
  },
  // 获取分类数据方法
  getCategoryList() {
    request({
      url: '/categories'
    }).then((result) => {
      // console.log(result);
      const leftMenuList = result.map(v => ({ cat_id: v.cat_id, cat_name: v.cat_name }))
      const rightGoodsList = result[0].children
      this.cates = result
      this.setData({
        leftMenuList,
        rightGoodsList,
      })
    })
  },
  // 点击左侧
  handleTapMenu(e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset
    this.setData({
      current: index,
      rightGoodsList: this.cates[index].children,
      scrollTop: 0
    })
  }
})