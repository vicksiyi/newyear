// pages/successPlay/index.js
let time = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 5,
    orderId: "",
    num: ""
  },
  onLoad(option) {
    time = setInterval(() => {
      if (this.data.second === 0) {
        clearInterval(time);
        wx.navigateBack({
          delta: 2,
        })
      } else {
        this.setData({
          second: this.data.second - 1
        })
      }
    }, 1000)
  },
  copy() {

  }
})