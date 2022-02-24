
const axios = require("./request");
// 获取loginCode
const getLoginCode = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) resolve(res.code);
        else reject(res.errMsg);
      }
    })
  })
}

exports.getToken = async () => {
  let code = await getLoginCode(); // 获取登录code
  return new Promise((resolve, reject) => {
    axios.request(`/oauth/getToken/${code}`, {})
      .then((res) => {
        if (res.data.code == 200) {
          resolve(res.data.token);
        }
      })
      .catch(err => reject(err))
  })
}

exports.oauthToken = (token) => {
  return new Promise((resolve, reject) => {
    axios.request(`/oauth/oauthToken`, {
      header: {
        Authorization: token
      }
    })
      .then((res) => {
        if (res.data.code == 200) { resolve(true); }
      })
      .catch(err => {
        resolve(false)
      })
  })
}