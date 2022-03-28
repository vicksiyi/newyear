// index.js
const app = getApp();
Page({
  data: {

  },
  handleStart() {
    wx.navigateTo({
      url: '/pages/login/index',
    });
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.getStorageInfo({
      success: (option) => {
        if (option.keys.length) {
          wx.redirectTo({
            url: '../login/index',
          })
        }
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})