import {
  request
} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({
  data: {
    tabs: [{
        id: 0,
        title: '综合',
        isActive: true
      },
      {
        id: 1,
        title: '销量',
        isActive: false
      },
      {
        id: 2,
        title: '价格',
        isActive: false
      }
    ],
    goodsList: [],
  },
  // 请求接口用参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,
  // 子组件触发的事件
  handleItemChange(e) {
    // console.log(e);
    const {
      index
    } = e.detail
    const tabs = this.data.tabs
    tabs.forEach((v, i) => {
      index === i ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
  },

  onLoad: function (options) {
    // console.log(options);
    const {
      cid
    } = options
    this.QueryParams.cid = cid
    this.getGoodsList()
  },
  // 获取商品列表数据
  async getGoodsList() {
    // request({
    //   url: '/goods/search',
    //   data: this.QueryParams
    // }).then((result) => {
    //   // console.log(result);
    //   // 计算总页数
    //   this.totalPages = Math.ceil(result.total / this.QueryParams.pagesize)
    //   this.setData({
    //     goodsList: [...this.data.goodsList, ...result.goods]
    //   })
    //   wx.stopPullDownRefresh()
    // })
    const  result = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    this.totalPages = Math.ceil( result.total / this.QueryParams.pagesize )
    this.setData({
      goodsList: [...this.data.goodsList, ...result.goods]
    })
    wx.stopPullDownRefresh()
  },
  // 上滑下一页
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
      })
    } else {
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.QueryParams.pagenum = 1
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
  }
})