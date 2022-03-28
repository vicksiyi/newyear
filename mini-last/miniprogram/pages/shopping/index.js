// pages/shopping/index.js
const item = require("../../static/js/item");
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    lists: [],
    show: false,
    selectId: -1,
    cards: {},
    items: [],
    loading: false,
    datas: [],
    money: 0,
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let _token = wx.getStorageSync('_token');
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({
          height: result.windowHeight - 50
        })
      },
    })
    this.setData({
      token: _token
    })
  },
  onShow: function () {
    let cards = wx.getStorageSync('cards');
    let money = wx.getStorageSync('money');
    this.getData(this.data.token);
    this.setData({
      cards: cards ? JSON.parse(cards) : {},
      money: money ? money : 0
    })
  },
  getData: function (token) {
    let _this = this;
    this.setData({
      loading: true
    })
    Promise.all([item.getItems(token), item.getType(token)]).then((res) => {
      let items = res[0].data.filter(value => value.typeId === res[1].data[0].id);
      _this.setData({
        items: items,
        datas: res[0].data,
        lists: res[1].data,
        selectId: res[1].data[0].id,
        loading: false
      })
    })
  },
  close: function () {
    this.setData({
      show: !this.data.show
    })
  },
  // 选好了，跳转到支付页面
  selectDone: async function () {
    if(JSON.stringify(this.data.cards) === '{}') {
      $Message({
        content: '不能为空',
        type: 'warning'
      });
      return;
    }
    let key = await item.noplay(this.data.token, this.data.cards);
    if (key) {
      // 上传成功清除本地缓存
      wx.removeStorageSync('cards');
      wx.removeStorageSync('money');
      wx.navigateTo({
        url: '../orderConfirm/index',
        success(res){
          // 发送一个事件
          res.eventChannel.emit('key', key)
        }
      })
    } else {
      $Message({
        content: '未知错误',
        type: 'error'
      });
    }
  },
  selectItemType: function (res) {
    let id = res.currentTarget.dataset.id;
    this.setData({
      selectId: id,
      items: this.data.datas.filter(value => value.typeId == id)
    })
  },
  // 增加数量
  add: function (res) {
    let _this = this;
    let cards = this.data.cards;
    let uuid = res.currentTarget.dataset.uuid;
    if (cards.hasOwnProperty(uuid)) {
      let item = `cards.${uuid}.count`;
      // 数量问题！！！！ ============> 需设计
      _this.setData({
        [item]: cards[uuid].count + 1,
      })
    } else {
      cards[uuid] = Object.assign(this.uuidToItem(uuid), { count: 1 });
      let temp = `cards.${uuid}`;
      _this.setData({
        [temp]: cards[uuid],
      })
    }
    this.updateCard();
  },
  // 减少数量
  reduce: function (res) {
    let _this = this;
    let cards = this.data.cards;
    let uuid = res.currentTarget.dataset.uuid;
    let item = `cards.${uuid}.count`;
    if (cards.hasOwnProperty(uuid) && cards[uuid].count != 0) {
      _this.setData({
        [item]: cards[uuid].count - 1
      })
    }
    if (cards[uuid] && cards[uuid].count === 0) {  // 如果为0，则删除
      delete cards[uuid]
      _this.setData({
        cards: cards
      })
    }
    this.updateCard();
  },
  // 更新存储本地的Card
  updateCard: function () {
    wx.setStorageSync('cards', JSON.stringify(this.data.cards));
    this.updateMoney();  // 更新钱
  },
  // 更新存储本地的money
  updateMoney: function () {
    let money = 0;
    let cards = this.data.cards;
    this.data.datas.forEach(element => {
      if (cards[element.uuid]) money += element.money * cards[element.uuid].count;
    });
    this.setData({
      money: money
    })
    wx.setStorageSync('money', money);
  },
  // uuid转item
  uuidToItem: function (uuid) {
    return this.data.datas.filter(value => value.uuid === uuid)[0];
  },
  clearCard: function () {
    this.setData({
      cards: {},
      money: 0
    })
    this.updateCard();  // 更新
  },
  // 预览图片
  showImage(res){
    const url = res.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
    })
  }
})