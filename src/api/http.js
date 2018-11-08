import axios from 'axios';
import os from '@/assets/api/os'
import {
    Indicator,
    Toast
} from 'mint-ui';

const instance = axios.create({
    timeout: 20000,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json;charset=utf-8'
    }
});

window.needLoading = true;

instance.interceptors.request.use(config => {
    if (window.needLoading) {
        Indicator.open({
            spinnerType: 'snake'
        });
    }
    // 在发送请求之前做些什么
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
        config.headers.Authorization = localStorage.getItem("token");
        config.headers.platform = 'kb';
        config.withCredentials = true;
    }
    return config;
}, error => {
    Indicator.close();
    // 对请求错误做些什么
    Toast("请求出错")
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
    Indicator.close();
    if (response.headers && (response.headers.Authorization || response.headers.authorization)) {
        localStorage.setItem('token', response.headers.Authorization || response.headers.authorization)
    }
    

    // localStorage.setItem('forceLogin', 'false');

    // 对响应数据做点什么

    //特定code拦截
    if (response.data.code === 0) {
        return Promise.resolve(response.data);
    } else {
        Toast(response.data.msg);
        if (response.data.code === 200001 || response.data.code === 220001 || response.data.code === 220005 || response.data.code === 220008 || response.data.code === 220010 || response.data.code === 200008) {
            if (os._android()) {
                window.control.logout()
            } else if (os._ios()) {
                window.webkit.messageHandlers.logout.postMessage('')
            }
        }
        
        return response.data
    }
    
}, error => {
    Indicator.close();
    // 对响应错误做点什么
    Toast("网络错误");
    return Promise.reject(error);
});

export default instance;
