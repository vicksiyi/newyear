// index.js
const app = getApp();
Page({
  data: {

  },
  handleStart() {
    wx.navigateTo({
      url: '/pages/login/index',
    });
  }
})