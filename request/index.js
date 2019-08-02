// 封装请求接口
let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++;
  // console.log(ajaxTimes);
  // 显示正在等待图标
  wx.showLoading({
    title: '正在加载中'
  });
  const baseUrl = 'https://api.zbztb.cn/api/public/v1'
  return new Promise((resolve, reject) => {
    var reqTask = wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result)=>{
        resolve(result.data.message)
      },
      fail: (error)=>{
        reject(error)
      },
      complete: ()=> {
        ajaxTimes--
        if(ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    });
  })
}