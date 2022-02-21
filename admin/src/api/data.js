import axios from "./axios";

export const getMenu = function (parms) {
    return axios.request({
        url: '/getmenu',
        method: 'post',
        data: parms
    })
}

export const getData = function (parms) {
    return axios.request({
        url: '/home/getData',
    })
}