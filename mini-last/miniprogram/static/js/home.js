const axios = require("./request");

exports.getPage = (token) => {
  return new Promise((resolve, reject) => {
    axios.request(`/page/getPage`, {
      header: {
        Authorization: token
      },
      methods:"GET"
    })
      .then((res) => {
        if (res.data.code == 200) { resolve(res.data); }
      })
      .catch(err => {
        resolve(false)
      })
  })
}

exports.getNotice = (token) => {
  return new Promise((resolve, reject) => {
    axios.request(`/notice/getNotice`, {
      header: {
        Authorization: token
      },
      methods:"GET"
    })
      .then((res) => {
        if (res.data.code == 200) { resolve(res.data); }
      })
      .catch(err => {
        resolve(false)
      })
  })
}