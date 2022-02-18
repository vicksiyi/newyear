// pages/orderDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: 'WD200012378136',
    orderNum: 'WD200012378136',
    orderTime: '2022-01-03 16：51：25',
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  }
})