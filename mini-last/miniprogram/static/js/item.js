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

exports.playDone = (token, data) => {
  return new Promise((resolve, reject) => {
    axios.request(`/play/playDone`, {
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

exports.getOrder = (token, key) => {
  return new Promise((resolve, reject) => {
    axios.request(`/item/getOrder`, {
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

// 获取自取号
exports.getInviteNum = (token, orderId) => {
  return new Promise((resolve, reject) => {
    axios.request(`/item/getInviteNum/${orderId}`, {
      header: {
        Authorization: token
      }
    })
      .then((res) => {
        if (res.data.code == 200) { resolve(res.data.num); }
      })
      .catch(err => {
        resolve(false)
      })
  })
}