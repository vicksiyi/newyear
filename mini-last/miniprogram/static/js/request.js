const app = getApp();
const baseUrl = app.baseUrl;

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getInsideConfig(api) {
    const config = {
      url: this.baseUrl + api,
      header: {},
    }
    return config
  }

  request(api, options) {
    options = Object.assign(this.getInsideConfig(api), options);
    return new Promise((resolve, reject) => {
      try {
        wx.request({
          ...options,
          success(res) { resolve(res) },
          fail(err) {
            reject(err);
          }
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

const axios = new HttpRequest(baseUrl);
module.exports = axios;