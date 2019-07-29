import { request } from '../../request/index.js'
Page({
  data: {
    // 轮播图数据
    swiperList: []
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
  },
  // 定义获取轮播图数据方法
  getSwiperList() {
    request({url:'/home/swiperdata'})
      .then((result) => {
        console.log(result);
        this.setData({
          swiperList: result
        })
      })
  }
})