// pages/login/index.js
const { $Message } = require("../../dist/base/index");
const { getToken, oauthToken } = require("../../static/js/oauth");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spinShow: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },
  onShow: async function () {
    let _this = this;
    // 判断是否已经授权
    let userInfo = wx.getStorageSync('userInfo');
    let _token = wx.getStorageSync('_token');
    // _this.setData({ spinShow: true })
    let isToken = await oauthToken(_token);
    // _this.setData({ spinShow: false })
    if (userInfo && _token && isToken) {
      wx.reLaunch({
        url: '../home/index',
      })
    }
  },
  getUser: function (res) {
    let _this = this;
    wx.getUserProfile({
      desc: '使用过程中需要使用',
      success: async (res) => {
        let _token = await getToken();
        $Message({
          content: '授权成功',
          type: 'success'
        });
        _this.setData({ spinShow: true })  //提示加载
        try {
          wx.setStorageSync('_token', _token)
          wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
          wx.reLaunch({
            url: '../home/index',
          })
        } catch (e) { console.log(err) }
        _this.setData({ spinShow: false }) // 加载完成
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