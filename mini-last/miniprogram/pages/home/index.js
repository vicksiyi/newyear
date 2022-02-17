// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    try {
      var value = wx.getStorageSync('userInfo') // 未授权则授权
      if (!value) {
        wx.reLaunch({
          url: '../login/index',
        })
      }
    } catch (e) {
      console.log(e);
    }
  },
  goShopping: function () {
    wx.navigateTo({
      url: '../shopping/index',
    })
  }
})