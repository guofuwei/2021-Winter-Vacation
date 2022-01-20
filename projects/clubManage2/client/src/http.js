import axios from "axios"
import {
    Loading,
    Message
} from 'element-ui';

import router from "./router"

let loading

function stratLoading() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中.....",
        background: "rgba(0,0,0,0.7)"
    })
}

function endloading() {
    loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
    // Do something before request is sent
    // 加载动画
    stratLoading();
    // 设置请求头
    config.headers.Authorization = localStorage.eleToken;
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});


// 响应拦截
axios.interceptors.response.use(response => {
    // Do something before response is sent
    endloading();
    return response;
}, error => {
    // Do something with response error
    endloading();
    Message.error(axios.response.data);
    // 清除token
    const {
        status
    } = error.response
    if (status == 401) {
        Message.error("token失效，请重新登录")
        localStorage.removeItem("eleToken");
        // 跳转到登录页面
        router.push("/login")
    }
    return Promise.reject(error);
});


export default axios