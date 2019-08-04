import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
import { getStorageCart, setStorageCart } from '../../utils/storage.js'
Page({
  data: {
    goodsInfo: {}
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
    this.setData({
      goodsInfo: {
        goods_name: result.goods_name,
        goods_price: result.goods_price,
        goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: result.pics
      }
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

})