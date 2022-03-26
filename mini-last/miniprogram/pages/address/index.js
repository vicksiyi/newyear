// pages/address/index.js
const { $Message } = require("../../dist/base/index");
const address = require("../../static/js/address");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    addressInput: {
      name: "王小小",
      mobile: "13338888887",
      address: "广东省茂名市广东石油化工学院官渡校区"
    },
    token: "",
    addressList: [],
    loading: false,
    isEdit: false,
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let _token = wx.getStorageSync('_token');
    this.setData({
      token: _token
    })
    this.getData(_token);
  },
  onShow() {
    const address = wx.getStorageSync('address');
    this.setData({
      address: address ? JSON.parse(address) : null
    })
  },
  async getData(_token) {
    this.setData({
      loading: true,
      visible: false
    })
    const addressList = await address.getAddress(_token);
    console.log(addressList);
    this.setData({
      addressList: addressList,
      loading: false
    })
  },
  handleClick: function (res) {
    this.setData({
      addressInput: { name: "", mobile: "", address: "" },
      visible: !this.data.visible,
      isEdit: false
    })
  },
  add: async function () {
    const addressInput = this.data.addressInput;
    if (!this.checkAddressInput(addressInput)) return;
    const status = await address.addAddress(this.data.token, addressInput);
    if (status) {
      $Message({
        content: '添加成功',
        type: 'success'
      })
      this.getData(this.data.token);  // 重新获取数据
    }
  },
  async edit() {
    const addressInput = this.data.addressInput;
    if (!this.checkAddressInput(addressInput)) return;
    const status = await address.editAddress(this.data.token, addressInput);
    if (status) {
      $Message({
        content: '修改成功',
        type: 'success'
      })
      this.getData(this.data.token);  // 重新获取数据
    }
  },
  checkAddressInput(addressInput) {
    if (!addressInput.name || !addressInput.mobile || !addressInput.address) {
      $Message({
        content: "字段不能为空",
        type: "warning"
      })
      return false;
    }
    return true;
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
  },
  // 修改地址
  editHandle(res) {
    const index = res.currentTarget.dataset.index;
    this.setData({
      addressInput: this.data.addressList[index],
      visible: true,
      isEdit: true
    })
  },
  select(res) {
    const index = res.currentTarget.dataset.index;
    wx.setStorageSync('address', JSON.stringify(this.data.addressList[index]));
    wx.navigateBack({ delta: 1 })
  }
})