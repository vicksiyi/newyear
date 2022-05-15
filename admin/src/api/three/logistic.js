import axios from 'axios';
import { appCode } from '../../assets/keys';
export const getLogistic = function (code) {
    let url = `/gxali`;
    const instance = axios.create();
    let options = {
        url: url,
        headers: {
            Authorization: `APPCODE ${appCode}`,
            "Content-Type": "text/html; charset=utf-8"
        },
        params: {
            n: code
        },
        method: "get"
    };
    return instance(options);
}