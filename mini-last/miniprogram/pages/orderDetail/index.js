// pages/orderDetail/index.js
const item = require("../../static/js/item");
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
    orderId: "",
    order: {},
    loading: false,
    num: "",
    type: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: async function () {
    let _token = wx.getStorageSync('_token');
    this.setData({
      loading: true,
      token: _token
    })
    const orderId = wx.getStorageSync('orderId');
    const order = wx.getStorageSync('order');
    const type = wx.getStorageSync('type');
    let num = this.data.num;
    if (type === '0') {
      num = await item.getInviteNum(_token, orderId);
    }
    this.setData({
      order: JSON.parse(order),
      orderId: orderId,
      loading: false,
      num: num,
      type: type
    })
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
  navLogistic: function () {
    wx.navigateTo({
      url: 'plugin://kdPlugin/index?num=SF1141900154711&appName=虎虎春联购',
    })
  }
})