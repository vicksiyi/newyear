// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: 'WD200012378136',
    orderNum: 'WD200012378136',
    orderTime: '2022-01-03 16：51：25',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showDetail: function () {
    wx.navigateTo({
      url: 'plugin://kdPlugin/index?num=SF1141900154711&appName=虎虎春联购',
    })
  }
})