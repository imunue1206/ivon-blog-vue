import axios from 'axios';
import { message } from 'ant-design-vue'



// 创建axios实例
const apiRequest = axios.create({
    baseURL: 'https://your-api-base-url.com/api', // API的基础URL
    timeout: 3000, // 请求超时时间
});

// 请求拦截器
apiRequest.interceptors.request.use(
    config => {
        // 可以在这里添加请求头等信息
        // config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    error => {
        console.error(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
apiRequest.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 200) { // 根据实际API定义修改
            message.error(res.message || 'Error');
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        console.error(error); // 用于调试
        message.error(error.message || 'Request failed');
        return Promise.reject(error);
    }
);

export default apiRequest;
