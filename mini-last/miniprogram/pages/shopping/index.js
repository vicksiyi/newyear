// pages/shopping/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    lists: ["盒联1.1m", "盒联1.3m", "盒联1.6m", "盒联2.2m", "盒联3.0m",
      "二开直联", "二开半直联", "三开直联", "四开直联", "五开直联", "红包", "中国结"],
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
  }
})