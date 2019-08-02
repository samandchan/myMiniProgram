/* Promise 形式的 wx.openSetting 打开授权页面 */
export const openSetting = ()=> {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      }
    });
  })
}

/* Promise 形式的 wx.getSetting 获取授权信息 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      }
    });
  })
}

/* Promise 形式的 wx.chooseAddress 获取用户地址 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (error)=>{
        reject(error)
      },
    });
  })
}
