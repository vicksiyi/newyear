// pages/address/index.js
const address = require("../../static/js/address");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    addressInput: {},
    token: "",
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let _token = wx.getStorageSync('_token');
    this.setData({
      token: _token
    })
    const addressList = await address.getAddress(_token);
    this.setData({
      addressList
    })
  },
  handleClick: function (res) {
    this.setData({
      visible: !this.data.visible
    })
  },
  add: function () {
    console.log(this.data.addressInput);
  },
  nameChange: function (res) {
    this.setData({
      ['addressInput.name']: res.detail.value
    })
  },
  mobileChange: function (res) {
    this.setData({
      ['addressInput.mobile']: res.detail.value
    })
  },
  addressChange: function (res) {
    this.setData({
      ['addressInput.address']: res.detail.detail.value
    })
  }
})