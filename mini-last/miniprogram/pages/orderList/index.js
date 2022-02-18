// pages/orderList/index.js
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
  navLogistic:function(){
    wx.navigateTo({
      url: 'plugin://kdPlugin/index?num=SF1141900154711&appName=虎虎春联购',
    })
  },
  show:function(){
    wx.navigateTo({
      url: '../orderDetail/index',
    })
  }
})