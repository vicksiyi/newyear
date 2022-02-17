// pages/lucky-turntable.js
const app = getApp();
Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    status: "iOS",
    canClick: true,
  },
  onLoad: function (options) {
    wx.hideHomeButton();
    wx.getSystemInfo({
      success: (result) => {
        const { statusBarHeight, system } = result;
        let navHeight = 0;
        let status = "";
        if (system.includes("iOS")) {
          navHeight = statusBarHeight + 44;
          status = "iOS";
        } else {
          navHeight = statusBarHeight + 48;
          status = "Android";
        }
        this.setData({
          statusBarHeight,
          navHeight,
          status
        });
      },
    })
  },
  onShow() {
    this.setData({canClick: true});
    if (app.globalData.happyNewYaer) {
      app.globalData.happyNewYaer.destroy();
    }
    app.globalData.happyNewYaer = wx.createInnerAudioContext();
    app.globalData.happyNewYaer.src = "/audio/happy_new_year.mp3";
    app.globalData.happyNewYaer.loop = true;
    app.globalData.happyNewYaer.play();
    const animation1 = wx.createAnimation({
      duration: 10,
      timingFunction: 'ease',
    });
    this.animation1 = animation1;
    animation1.rotate(0).step();
    this.setData({
      animationData: animation1.export()
    });
  },
  handleStart() {
    console.log('start rotate');
    this.data.canClick && this.animationRotate();
  },
  animationRotate() {
    this.setData({canClick: false});
    const angle = Math.floor(Math.random() * (360 - 1)) + 1;
    const animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease',
    });
    this.animation = animation;
    animation.rotate(angle + 360 * 8).step();
    this.setData({
      animationData: animation.export()
    });
    setTimeout(() => {
      wx.navigateTo({
        url: `/pages/blessing/blessing?angle=${angle}`,
      })
    }, 3300);
  },
})