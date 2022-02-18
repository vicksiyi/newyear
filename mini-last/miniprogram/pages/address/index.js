// pages/address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleClick: function (res) {
    console.log(res);
    this.setData({
      visible: !this.data.visible
    })
  }
})