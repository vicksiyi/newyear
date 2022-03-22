const axios = require("./request");

exports.getItems = (token) => {
  return new Promise((resolve, reject) => {
    axios.request(`/item/getItems`, {
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

exports.getType = (token) => {
  return new Promise((resolve, reject) => {
    axios.request(`/item/getType`, {
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