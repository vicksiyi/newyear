// pages/orderList/index.js
const item = require("../../static/js/item");
const time = require("../../utils/time");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    noplay: [],
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: async function (options) {
    let _token = wx.getStorageSync('_token');
    this.setData({
      token: _token,
      loading: true
    })
    let noplay = await item.play(_token);
    noplay = noplay.map((value, key) => {
      value.time = time.formatTimestamp(value.time);  // 格式化时间
      let money = 0, count = 0;
      for (const key in value.data) {
        money += value.data[key].money;
        count++;
      }
      value.money = money;
      value.count = count;
      value.firstTitle = value.data[Object.keys(value.data)[0]].title;
      return value;
    })
    this.setData({
      noplay: noplay,
      loading: false
    })
  },
  navLogistic: function () {
    wx.navigateTo({
      url: 'plugin://kdPlugin/index?num=SF1141900154711&appName=虎虎春联购',
    })
  },
  show: function () {
    wx.navigateTo({
      url: '../orderDetail/index',
    })
  },
  navPlay: function () {
    wx.navigateTo({
      url: '../orderConfirm/index',
    })
  },
  navOrderConfirm: function (res) {
    const key = res.currentTarget.dataset.key;
    wx.navigateTo({
      url: '../orderConfirm/index',
      success: (res) => {
        // 发送一个事件
        res.eventChannel.emit('key', key)
      }
    })
  }
})