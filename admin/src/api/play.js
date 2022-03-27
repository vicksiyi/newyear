import axios from "./axios";

export const getNotPlay = function (parms) {
    return axios.request({
        url: '/api/play/getNotPlay',
        method: 'get',
        headers: parms.headers
    })
}
