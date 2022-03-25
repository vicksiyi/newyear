const axios = require("./request");

exports.getAddress = (token) => {
  return new Promise((resolve, reject) => {
    axios.request(`/address/get`, {
      header: {
        Authorization: token
      }
    })
      .then((res) => {
        if (res.data.code == 200) { resolve(res.data.data); }
      })
      .catch(err => {
        resolve(false)
      })
  })
}