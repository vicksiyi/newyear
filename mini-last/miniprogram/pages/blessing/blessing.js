// pages/blessing/blessing.js
const app = getApp();
Page({
  data: {
    blessingWords: '',
  },
  onLoad: function (options) {
    options = options || {};
    const { angle } = options;
    this.setBlessingWords(angle);
    this.setCanvasSize();
  },
  onShow() {
    if (!app.globalData.happyNewYaer) {
      app.globalData.happyNewYaer = wx.createInnerAudioContext();
      app.globalData.happyNewYaer.src = "/audio/happy_new_year.mp3";
      app.globalData.happyNewYaer.loop = true;
      app.globalData.happyNewYaer.play();
    }
  },
  onHide() {
    app.globalData.happyNewYaer.destroy();
    app.globalData.happyNewYaer = null;
  },
  onShareAppMessage() {
    return {
      title: '小微祝你虎年大吉！',
      path: '/pages/index/index',
      imageUrl: '/images/share.jpg'
    }
  },
  // 获取屏幕尺寸
  setCanvasSize() {
    wx.getSystemInfo({
      success: (res) => {
        const rpx = res.windowWidth / 375;
        this.setData({
          canvasWidth: res.windowWidth,
          canvasHeight: res.windowHeight,
          rpx,
        })
        this.drawPoster()
      },
    })
  },
  setBlessingWords(angle) {
    let blessingWords = '';
    if (angle > 337) {
      blessingWords = '幸福美满'
    } else if (angle > 292) {
      blessingWords = '福如东海'
    } else if (angle > 247) {
      blessingWords = '身体健康'
    } else if (angle > 202) {
      blessingWords = '步步高升'
    } else if (angle > 157) {
      blessingWords = '吉祥如意'
    } else if (angle > 112) {
      blessingWords = '笑口常开'
    } else if (angle > 67) {
      blessingWords = '虎虎生威'
    } else if (angle > 22) {
      blessingWords = '心想事成'
    } else {
      blessingWords = '幸福美满'
    }
    this.setData({
      blessingWords
    });
  },
  // 导出图片
  exportPoster() {
    // 通过wx.canvasToTempFilePath获取本地路径
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvas: this.canvas,
      width: this.data.canvasWidth,
      height: this.data.canvasHeight,
      canvasId: 'posterCanvas',
      fail: (err) => {
        console.error(err)
      },
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            wx.showToast({
              title: '生成图片成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: (err) => {
            wx.showToast({
              title: '生成图片失败',
              icon: 'error',
              duration: 2000
            })
          }
        })
      }
    })
  },
  drawPoster() {
    wx.createSelectorQuery()
      .select('#posterCanvas')
      .fields({
        node: true,
        size: true,
      })
      .exec((res) => {
        const width = res[0].width
        const height = res[0].height
        this.canvas = res[0].node
        this.ctx = this.canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        this.canvas.width = width * dpr
        this.canvas.height = height * dpr
        this.ctx.scale(dpr, dpr)

        // 绘制背景颜色
        this.ctx.fillStyle = '#D8322E'
        this.ctx.fillRect(0, 0, width, height)

        // 背景图
        const bgImage = this.canvas.createImage()
        const bgLeft = (width - height * 0.4728) / 2
        const bgTop = width / 750 * 5 // 5rpx
        const bgWidth = height * 0.4728
        const bgHeight = height * 0.9526
        bgImage.src = '../../images/bg_image_3.png'
        bgImage.onload = () => {
          // 绘制文字
          this.ctx.fillStyle = '#fff';
          const fontSize = height * 0.0208
          const fontTop = height * 0.245
          this.ctx.font = `${fontSize}px bold`
          this.ctx.textAlign = 'center'
          this.ctx.fillText('小微祝福你', width / 2, fontTop);
          this.ctx.save()

          // 绘制对联
          this.ctx.fillStyle = '#F4E4BA';
          const blessingWordSize = height * 0.08
          const blessingWordTop = height * 0.405
          const gap = height * 0.34 / 4
          this.ctx.font = `${blessingWordSize}px bold`
          // 设置文字阴影的颜色为黑色，透明度为 0.8%
          this.ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'
          this.ctx.shadowOffsetX = 3
          this.ctx.shadowOffsetY = 6
          // 轻微模糊阴影
          this.ctx.shadowBlur = 10
          // 竖着绘制
          for (let i = 0; i <= this.data.blessingWords.length - 1; i++) {
            const word = this.data.blessingWords[i]
            this.ctx.fillText(word, width / 2, blessingWordTop + gap * i);
          }
          // 恢复阴影设置
          this.ctx.restore()

          this.ctx.drawImage(bgImage, bgLeft, bgTop, bgWidth, bgHeight)
          // 绘制了图片才会绘制头像
          const avatarBorderWidth = height * 0.126
          const avatarBorderLeft = (width - avatarBorderWidth) / 2
          const avatarBorderTop = height * 0.0378
          this.drawImage({
            src: '../../images/avatar_border.png',
            x: avatarBorderLeft,
            y: avatarBorderTop,
            width: avatarBorderWidth,
            height: avatarBorderWidth,
          })
          const avatarWidth = height * 0.1149
          const avatarLeft = (width - avatarWidth) / 2
          const avatarTop = height * 0.0444
          this.drawImage({
            src: '../../images/avatar.png',
            x: avatarLeft,
            y: avatarTop,
            width: avatarWidth,
            height: avatarWidth,
          })

          // 绘制二维码
          const qrcodeWidth = height * 0.1177
          const qrcodeLeft = (width - qrcodeWidth) / 2
          const qrcodeTop = height * 0.7555
          this.drawImage({
            src: '../../images/qr_code.png',
            x: qrcodeLeft,
            y: qrcodeTop,
            width: qrcodeWidth,
            height: qrcodeWidth,
          })

        }
      })
  },
  drawImage(options) {
    const img = this.canvas.createImage()
    img.src = options.src
    img.onload = () => {
      this.ctx.drawImage(img, options.x, options.y, options.width, options.height)
    }
  }
})