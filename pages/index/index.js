import { request } from '../../request/index.js'
Page({
  data: {
    // 轮播图数据
    swiperList: [],
    // 分类导航数据
    cateList: [],
    // 楼层数据
    floorList: []
  },
  // // 页面一加载就触发
  // onLoad() {
  //   wx.request({
  //     url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
  //     success: (result)=>{
  //       console.log(result); 
  //     }
  //   });
  // }
  onLoad() {
    // 获取轮播图数据
    this.getSwiperList()
    // 分类导航
    this.getCateList()
    // 楼层
    this.getFloorList()
  },
  // 定义获取轮播图数据方法
  getSwiperList() {
    request({url: '/home/swiperdata'})
      .then((result) => {
        // console.log(result);
        this.setData({
          swiperList: result
        })
      })
  },
  // 定义获取分类导航数据的方法
  getCateList() {
    request({url: '/home/catitems'})
    .then((result) => {
      // console.log(result);
      this.setData({
        cateList: result
      })
    })
  },
  // 定义获取楼层数据方法
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then((result) => {
      // console.log(result);
      this.setData({
        floorList: result
      })
    })
  }
})