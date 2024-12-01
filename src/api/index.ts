import axios from "axios";
import axiosTauriApiAdapter from "axios-tauri-api-adapter";
import { showGlobalError } from "../utils/errorHandler"; // 全局错误处理工具
import { getAccessToken } from "../utils/token";

const client = axios.create({ adapter: axiosTauriApiAdapter });

// client 设置baseURL
client.defaults.baseURL = "http://0.0.0.0:4578/api";

// 增加请求拦截器
client.interceptors.request.use(
  (config) => {
    // 添加token
    const token = getAccessToken();
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 增加响应拦截器
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.message + " " + error.response?.data?.error;

    // 调用全局错误处理工具
    showGlobalError(message);

    // 继续抛出错误，便于业务代码需要时捕获
    return Promise.reject({ message, status });
  }
);

export default client;
