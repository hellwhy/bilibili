import axios from "axios";
import router from '@/router'
import Vue from 'vue'


export const http = axios.create({
  baseURL: "http://112.74.99.5:3000/web/api",
  timeout: 5000,
});

// 请求拦截
http.interceptors.request.use(config => {
    // 判断本地存储中是否存在id 和 token 存在就添加请求头
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return config;
  },err => {
    return err;
  }
);
// 响应拦截
http.interceptors.response.use(config => {
    return config;
  },err => {
    if(err.response.status === 401 || err.response.status === 402) {
      router.replace('/login')
      Vue.prototype.$msg.fail(err.response.data.message)
    }
    return err;
  }
);
