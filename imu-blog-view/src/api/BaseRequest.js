import axios from 'axios';

// 创建axios实例
const apiRequest = axios.create({
    baseURL: 'http://127.0.0.1:7070/imu-blog-service', // API的基础URL
    timeout: 3000, // 请求超时时间
});

// 请求拦截器
apiRequest.interceptors.request.use(
    config => {
        // config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    error => {
        // 客户端请求出错时触发
        window.dispatchEvent(new CustomEvent('axiosGlobalErrorHandle', { detail: error.message || '客户端请求出错' }));
        return Promise.reject(error);
    }
);

// 响应拦截器
apiRequest.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 200) {
            // 根据后端返回的响应码判断错误
            window.dispatchEvent(new CustomEvent('axiosGlobalErrorHandle', { detail: res.message || '服务端响应出错' }));
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        // 捕捉服务端的响应错误
        let errorMessage = '服务端响应失败';
        if (error.response) {
            // 服务器有响应但状态码不是2xx
            errorMessage = `错误 ${error.response.status}: ${error.response.statusText || error.message}`;
        }
        window.dispatchEvent(new CustomEvent('axiosGlobalErrorHandle', { detail: errorMessage }));
        return Promise.reject(error);
    }
);

export default apiRequest;