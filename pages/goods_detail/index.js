import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    goodsInfo: {}
  },
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
    console.log(e);
    const { index } = e.currentTarget.dataset
    const urls = this.data.goodsInfo.pics.map(v=>v.pics_big)
    wx.previewImage({
      current: urls[index],
      urls
    });
    
  }


})