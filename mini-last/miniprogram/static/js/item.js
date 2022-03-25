const axios = require("./request");

exports.getItems = (token) => {
  return new Promise((resolve, reject) => {
    axios.request(`/item/getItems`, {
      header: {
        Authorization: token
      }
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
      }
    })
      .then((res) => {
        if (res.data.code == 200) { resolve(res.data); }
      })
      .catch(err => {
        resolve(false)
      })
  })
}

exports.noplay = (token, cards) => {
  return new Promise((resolve, reject) => {
    axios.request(`/item/noplay`, {
      header: {
        Authorization: token
      },
      data: {
        cards: typeof cards === "string" ? cards : JSON.stringify(cards)
      },
      method: "POST"
    })
      .then((res) => {
        if (res.data.code == 200) { resolve(res.data.key); }
      })
      .catch(err => {
        reject(false)
      })
  })
}

exports.play = (token, cards) => {
  return new Promise((resolve, reject) => {
    axios.request(`/play/getNotPlay`, {
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

exports.getPlay = (token, key) => {
  return new Promise((resolve, reject) => {
    axios.request(`/item/getPlay/${key}`, {
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