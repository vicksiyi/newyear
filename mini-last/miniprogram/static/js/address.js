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

exports.addAddress = (token, data) => {
  return new Promise((resolve, reject) => {
    axios.request(`/address/add`, {
      header: {
        Authorization: token
      },
      data: data,
      method: "POST"
    })
      .then((res) => {
        if (res.data.code == 200) { resolve(true); }
      })
      .catch(err => {
        resolve(false)
      })
  })
}

exports.editAddress = (token, data) => {
  return new Promise((resolve, reject) => {
    axios.request(`/address/edit/${data.id}`, {
      header: {
        Authorization: token
      },
      data: data,
      method: "PUT"
    })
      .then((res) => {
        if (res.data.code == 200) { resolve(true); }
      })
      .catch(err => {
        resolve(false)
      })
  })
}