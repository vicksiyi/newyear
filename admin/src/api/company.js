import axios from "./axios";

// 获取物流公司列表
export const getCompany = function (params) {
    return axios.request({
        url: `/api/company/getCompany/${params.page}`,
        method: 'get',
        headers: params.headers
    })
}
// 获取物流公司数量
export const getCompanyNum = function (params) {
    return axios.request({
        url: `/api/company/getCompanyNum`,
        method: 'get',
        headers: params.headers
    })
}
// 添加物流公司
export const addCompany = function (params) {
    return axios.request({
        url: `/api/company/addCompany`,
        method: 'post',
        headers: params.headers,
        data: params.data
    })
}

// 删除物流公司
export const delCompany = function (params) {
    return axios.request({
        url: `/api/company/delCompany/${params.id}`,
        method: 'delete',
        headers: params.headers
    })
}