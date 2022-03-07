import axios from "./axios";

export const add = function (parms) {
    return axios.request({
        url: '/api/notice/add',
        method: 'post',
        headers: parms.headers,
        data: parms.data
    })
}

export const get = function (parms) {
    return axios.request({
        url: `/api/notice/get/${parms.page}`,
        method: 'get',
        headers: parms.headers,
    })
}

export const update = function (parms) {
    return axios.request({
        url: `/api/notice/update/${parms.id}/${parms.status}`,
        method: 'put',
        headers: parms.headers,
    })
}