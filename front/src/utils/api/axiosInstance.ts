import axios from 'axios';
import eventEmitter from '../eventEmitter';

// Create a custom axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Replace with your Symfony backend URL
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiry
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('jwt_token');
            eventEmitter.emit('unauthorized');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
