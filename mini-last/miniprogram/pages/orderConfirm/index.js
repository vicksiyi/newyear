// pages/orderConfirm/index.js
const { $Message } = require("../../dist/base/index");
const item = require("../../static/js/item");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "",
    current: 'tab1',
    max: 200, //限制最大输入字符数
    min: 1,  //限制最小输入字符数
    minWord: '',//提示语句
    height: 0,
    latitude: 39.89631551,
    longitude: 116.323459711,
    markers: [{
      id: 1,
      latitude: 39.89631551,
      longitude: 116.323459711,
      name: '虎虎春联购'
    }],
    covers: [{
      latitude: 39.89631551,
      longitude: 116.323459711,
      iconPath: '/image/location.png'
    }, {
      latitude: 39.89631551,
      longitude: 116.323459711,
      iconPath: '/image/location.png'
    }],
    address: null,
    token: "",
    key: "",
    items: [],
    money: 0,
    count: 0,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let _token = wx.getStorageSync('_token');
    let key = await this.getKey();  // 获取传过来的key
    this.setData({
      token: _token,
      key: key
    })
    this.getDetail(_token, key);
    let _this = this;
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({
          height: result.windowHeight - 140
        })
      },
    })
  },
  onShow() {
    const address = wx.getStorageSync('address');
    this.setData({
      address: address ? JSON.parse(address) : null
    })
  },
  getKey: function () {
    return new Promise((resolve, reject) => {
      //	获取所有打开的EventChannel事件
      const eventChannel = this.getOpenerEventChannel();
      // 监听 index页面定义的 toB 事件
      eventChannel.on('key', (res) => {
        resolve(res);
      })
    })
  },
  getDetail: async function (token, key) {
    this.setData({
      loading: true
    })
    const getPlay = await item.getPlay(token, key);
    let money = 0;
    for (const key in getPlay.detail) {
      money += getPlay.detail[key].money;
    }
    this.setData({
      items: getPlay.detail,
      money: money,
      count: getPlay.detail.length,
      loading: false
    })
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  navigation: function () {
    let plugin = requirePlugin('routePlan');
    let key = 'CWXBZ-JSM6U-KCJV5-2MKJ7-R6PO3-GZBA3';  //使用在腾讯位置服务申请的key
    let referer = '虎虎春联购';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': '吉野家(北京西站北口店)',
      'latitude': 39.89631551,
      'longitude': 116.323459711
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
  getValueLength: function (e) {
    let value = e.detail.value
    let len = parseInt(value.length)
    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        minWord: "至少填写10个字哦～"
      })
    else if (len > this.data.min)
      this.setData({
        minWord: " "
      })
    //最多字数限制
    if (len > 200) return;
    this.setData({
      currentWordNumber: len, //当前字数 
      msg: value
    })
  },
  selectDone: async function () {
    let data = {
      key: this.data.key,
      type: this.data.current === 'tab1' ? 0 : 1,
      msg: this.data.msg,
      addressId: this.data.address.id
    }
    if (data.type === 0 && data.msg === '') {
      $Message({
        content: "需要备注时间",
        type: "warning"
      })
      return;
    }
    if (data.type === 1 && data.addressId === undefined) {
      $Message({
        content: "请先填写快递信息",
        type: "warning"
      })
      return;
    }
    this.setData({
      loading: true
    })
    let status = await item.playDone(this.data.token, data);
    this.setData({
      loading: false
    })
    if (status) {
      wx.navigateTo({
        url: '../successPlay/index',
      })
    } else {
      $Message({
        content: "支付失败",
        type: "error"
      })
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})