import axios from "./axios";

export const getInvite = function (parms) {
    return axios.request({
        url: '/api/order/getInvite',
        method: 'get',
        headers: parms.headers
    })
}

export const nextStatus = function (parms) {
    return axios.request({
        url: `/api/order/nextStatus/${parms.orderId}`,
        method: 'put',
        headers: parms.headers
    })
}


export const getExpress = function (parms) {
    return axios.request({
        url: `/api/order/getExpress`,
        method: 'get',
        headers: parms.headers
    })
}

export const addLogistic = function (parms) {
    return axios.request({
        url: `/api/order/addLogistic`,
        method: 'post',
        data: parms.data,
        headers: parms.headers
    })
}