import axios from "./axios";

export const oauthLogin = function (parms) {
    return axios.request({
        url: '/api/oauth/login',
        method: 'post',
        data: parms
    })
}