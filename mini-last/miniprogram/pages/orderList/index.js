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
    loading: false,
    express: {},
    invites: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: async function (options) {
    let _token = wx.getStorageSync('_token');
    this.setData({
      token: _token
    })
    this.getData(_token);
  },
  getData(_token) {
    let _this = this;
    this.setData({
      loading: true
    })
    Promise.all([item.getOrder(_token), item.play(_token)]).then((res) => {
      let noplay = res[1], orders = res[0];
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
      _this.setData({
        noplay: noplay,
        express: orders[1],
        invites: orders[0],
        loading: false
      })
    })
  },
  navLogistic: function () {
    wx.navigateTo({
      url: 'plugin://kdPlugin/index?num=SF1141900154711&appName=虎虎春联购',
    })
  },
  show: function (res) {
    const type = res.currentTarget.dataset.type;
    const orderId = res.currentTarget.dataset.orderid;
    console.log(type, typeof type);
    const order = type === '0' ? this.data.invites[orderId] : this.data.express[orderId];
    wx.setStorageSync('order', JSON.stringify(order));
    wx.setStorageSync('orderId', orderId);
    wx.setStorageSync('type', type);
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