import axios from "../axios";

// 添加商品
export const addItem = function (parms) {
    return axios.request({
        url: '/api/item/addItem',
        method: 'post',
        headers: parms.headers,
        data: parms.data
    })
}
// 分页获取商品
export const getItem = function (parms) {
    return axios.request({
        url: `/api/item/getItem/${parms.page}`,
        method: 'get',
        headers: parms.headers,
    })
}
// 上架商品
export const upItem = function (parms) {
    return axios.request({
        url: `/api/item/upItem/${parms.uuid}`,
        method: 'put',
        headers: parms.headers,
    })
}

// 下架商品
export const downItem = function (parms) {
    return axios.request({
        url: `/api/item/downItem/${parms.uuid}`,
        method: 'put',
        headers: parms.headers,
    })
}

// 修改商品
export const editItem = function (parms) {
    return axios.request({
        url: `/api/item/editItem`,
        method: 'post',
        headers: parms.headers,
        data: parms.data
    })
}