import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
import { getStorageCart, setStorageCart } from '../../utils/storage.js'
Page({
  data: {
    goodsInfo: {},
    // 是否收藏
    isCollected: false
  },
  goodsObj: {},
  onLoad(options) {
    // console.log(options);
    this.getGoodsInfo(options.goods_id)
  },
  // 获取商品详情
  async getGoodsInfo(goods_id) {
    const result = await request({
      url: '/goods/detail',
      data: {goods_id}
    })
    this.goodsObj = result;
    // console.log(result);
    
    // 判断是否收藏
    let collect = wx.getStorageSync('collect') || [];
    let isCollected = collect.some(v => {
      return v.goods_id === this.goodsObj.goods_id
    })

    this.setData({
      goodsInfo: {
        goods_name: result.goods_name,
        goods_price: result.goods_price,
        goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: result.pics
      },
      isCollected
    })
  },
  // 预览图片
  handlePreviewImage(e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset
    const urls = this.data.goodsInfo.pics.map(v=>v.pics_big)
    wx.previewImage({
      current: urls[index],
      urls
    });
  },
  // 加入购物车
  handleAddCart() {
    let cart = getStorageCart() || {}
    if(cart[this.goodsObj.goods_id]) {
      // 已存在购物车
      cart[this.goodsObj.goods_id].num++
    }else {
      // 还没存在购物车
      cart[this.goodsObj.goods_id] = this.goodsObj
      cart[this.goodsObj.goods_id].num = 1
      cart[this.goodsObj.goods_id].checked = true
    }
    setStorageCart(cart)
    wx.showToast({
      title: '成功加入购物车',
      mask: true
    });
  },

  // onReady () {
  //   this.videoContext = wx.createVideoContext('myVideo')
  // },
  // //全屏播放视频
  // bofang() {
  //   console.log(this);
  //   console.log(this.videoContext);
  //   this.videoContext.requestFullScreen()
  // }

  // 收藏
  handleCollected() {
    let collect = wx.getStorageSync('collect') || [];
    // let isCollected = collect.some(v => {
    //   return v.goods_id === this.data.goodsObj.goods_id
    // })
    let index = collect.findIndex(v => {
      return v.goods_id === this.goodsObj.goods_id
    })
    let text = index > -1 ? '取消收藏' : '成功收藏'
    if(index > -1) {
      collect.splice(index, 1)
    }else {
      collect.push(this.goodsObj)
    }
    wx.showToast({
      title: text,
      icon: 'success',
      mask: true
    });
    
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollected: !this.data.isCollected
    })
  }
})