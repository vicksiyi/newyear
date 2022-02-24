import axios from "./axios";

export const getCompany = function (params) {
    return axios.request({
        url: `/api/company/getCompany/${params.page}`,
        method: 'get',
        headers: params.headers
    })
}

export const getCompanyNum = function (params) {
    return axios.request({
        url: `/api/company/getCompanyNum`,
        method: 'get',
        headers: params.headers
    })
}

export const addCompany = function (params) {
    return axios.request({
        url: `/api/company/addCompany`,
        method: 'post',
        headers: params.headers,
        data: params.data
    })
}

export const delCompany = function (params) {
    return axios.request({
        url: `/api/company/delCompany/${params.id}`,
        method: 'delete',
        headers: params.headers
    })
}