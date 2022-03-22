// pages/shopping/index.js
const item = require("../../static/js/item");
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({
          height: result.windowHeight - 50
        })
      },
    })
    let _token = wx.getStorageSync('_token');
    let cards = wx.getStorageSync('cards');
    let money = wx.getStorageSync('money');
    this.getData(_token);
    this.setData({
      cards: JSON.parse(cards),
      money: money
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
    if (!this.data.show) {
      this.showCards();
    }
    this.setData({
      show: !this.data.show
    })
  },
  selectDone: function () {
    wx.navigateTo({
      url: '../orderConfirm/index',
    })
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
    console.log(this.uuidToItem(uuid));
    if (cards.hasOwnProperty(uuid)) {
      let item = `cards.${uuid}.count`;
      // 数量问题！！！！ ============> 需设计
      _this.setData({
        [item]: cards[uuid].count + 1,
      })
    } else {
      cards[uuid] = { count: 1 };
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
  // 查看已经选的商品
  showCards: function () {
    let _this = this;
    let cards = this.data.cards;
    for (let key in cards) {
      cards[key] = Object.assign(cards[key], this.uuidToItem(key));
    }
    this.setData({
      cards: cards
    })
  },
  clearCard: function () {
    this.setData({
      cards: {},
      money: 0
    })
    this.updateCard();  // 更新
  }
})