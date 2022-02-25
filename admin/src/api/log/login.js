import axios from "./axios";

export const getLoginLogs = function (parms) {
    return axios.request({
        url: '/api/oauth/login',
        method: 'post',
        data: parms
    })
}