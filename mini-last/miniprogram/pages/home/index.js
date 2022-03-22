// pages/home/index.js
const home = require("../../static/js/home");
const time = require("../../utils/time");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    pages: [],
    notice: {},
    spinShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getData();
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
  },
  getData() {
    let _token = wx.getStorageSync('_token');
    this.setData({
      spinShow: true
    })
    Promise.all([home.getPage(_token), home.getNotice(_token)]).then(res => {
      res[1].notice.startTime = time.formatTimestamp(new Date(res[1].notice.startTime).getTime());
      this.setData({
        pages: res[0].data,
        notice: res[1].notice,
        spinShow: false
      })
    })
  }
})