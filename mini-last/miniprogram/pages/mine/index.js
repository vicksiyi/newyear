// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    let _this = this;
    try {
      var value = wx.getStorageSync('userInfo') // 未授权则授权
      if (!value) {
        wx.reLaunch({
          url: '../login/index',
        })
      } else {
        _this.setData({
          userInfo: JSON.parse(value)
        })
      }
    } catch (e) {
      console.log(e);
    }
  }
})