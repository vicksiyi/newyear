// pages/comsumption/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    height: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({
          height: result.windowHeight - 50
        })
      },
    })
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  navOrder: function () {
    wx.navigateTo({
      url: '../order/index',
    })
  },
  navOrderDetail: function () {
    wx.navigateTo({
      url: '../orderDetail/index',
    })
  }
})