import axios from 'axios';
import store from '../stores/root';

const isDevServerProxy = false;

const api = axios.create({
    baseURL: isDevServerProxy
        ? `http://localhost:3000/api/v1`
        : `http://localhost:8080/api/v1`
});

// Request interceptor for API calls
api.interceptors.request.use(
    async config => {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const refreshToken = localStorage.getItem('REFRESH_TOKEN');

        if (accessToken) {
            config.headers.set({
                'Authorization': `Bearer ${accessToken}`,
                'X-Refresh': refreshToken,
                // "Accept": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded"
            })
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

// Response interceptor for API calls
api.interceptors.response.use(
    response => {
        console.log(response.headers);
        return response;
    },
    async function (error) {
        const originalRequestConfig = error.config;
        const {response} = error;
        if (!response) return Promise.reject(error);
        const {status} = response;
        if (!status) return Promise.reject(error);

        if (status === 403 && !originalRequestConfig._retry) {
            originalRequestConfig._retry = true;
            // const access_token = await refreshAccessToken();

            const accessToken = localStorage.getItem('ACCESS_TOKEN');
            axios.defaults.headers.common['Authorization'] = `Bearer ` + accessToken;
            return api(originalRequestConfig);
        } else if (status === 401) {
            // window.location.href = '/login';
        }

        return Promise.reject(error);
    });

export default api;
