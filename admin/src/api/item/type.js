import axios from "../axios";

// 添加商品类别
export const addItemType = function (parms) {
    return axios.request({
        url: '/api/itemType/addItemType',
        method: 'post',
        headers: parms.headers,
        data: parms.data
    })
}

// 获取商品类别列表
export const getItemType = function (parms) {
    return axios.request({
        url: '/api/itemType/getItemType',
        method: 'get',
        headers: parms.headers,
    })
}

// 下架商品类别
export const downItemType = function (parms) {
    return axios.request({
        url: `/api/itemType/downItemType/${parms.id}`,
        method: 'put',
        headers: parms.headers,
    })
}

// 上架商品类别
export const upItemType = function (parms) {
    return axios.request({
        url: `/api/itemType/upItemType/${parms.id}`,
        method: 'put',
        headers: parms.headers,
    })
}

// 交换优先级
export const swapItemType = function (parms) {
    return axios.request({
        url: `/api/itemType/swapItemType`,
        method: 'put',
        headers: parms.headers,
        data: parms.data
    })
}