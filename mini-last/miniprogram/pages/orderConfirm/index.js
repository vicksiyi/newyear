// pages/orderConfirm/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    address: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({
          height: result.windowHeight - 140
        })
      },
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
      currentWordNumber: len //当前字数 
    })
  },
  selectDone: function () {
    wx.navigateTo({
      url: '../orderDetail/index',
    })
  }
})