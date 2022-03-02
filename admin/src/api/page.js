import axios from "./axios";

export const add = function (parms) {
    return axios.request({
        url: '/api/page/add',
        method: 'post',
        headers: parms.headers,
        data: parms.data
    })
}

export const get = function (parms) {
    return axios.request({
        url: '/api/page/get',
        method: 'get',
        headers: parms.headers
    })
}