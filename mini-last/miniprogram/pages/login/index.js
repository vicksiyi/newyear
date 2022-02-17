// pages/login/index.js
const { $Message } = require("../../dist/base/index");
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
  getUser: function (res) {
    let _this = this;
    wx.getUserProfile({
      desc: '使用过程中需要使用',
      success: (res) => {
        wx.setStorage({
          key: "userInfo",
          data: JSON.stringify(res.userInfo),
          success: function () {
            $Message({
              content: '授权成功',
              type: 'error'
            })
            wx.reLaunch({
              url: '../home/index',
            })
          }
        })
      },
      fail: function (err) {
        $Message({
          content: '用户拒绝',
          type: 'error'
        });
      }
    })
  }
})