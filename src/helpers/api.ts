import axios from 'axios';
import store from '../stores';

const isDevServerProxy = false;

const api = axios.create({
    baseURL: isDevServerProxy
        ? `http://localhost:3000/api/v1`
        : `http://localhost:8080/api/v1`
});

// Request interceptor for API calls
api.interceptors.request.use(
    async config => {
        const {userState} = store.getState();
        if (userState.user.access_token) {
            config.headers.set({
                'Authorization': `Bearer ${userState.user.access_token}`,
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
    (response) => {
        console.log(response.headers);
        return response;
    },
    async function (error) {
        if (error.response === undefined) {
            console.warn(`[React Bunny Warn]Request failed,first do not forget to run the mock server in another terminal with command 'yarn mock'`);
        }
        const originalRequest = error.config;
        const {status} = error.response;
        if (status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            // const access_token = await refreshAccessToken();

            const access_token = '';
            axios.defaults.headers.common['Authorization'] = `Bearer ` + access_token;
            return api(originalRequest);
        } else if (status === 401) {
            // window.location.href = '/login';
        }

        return Promise.reject(error);
    });


// // http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         if (store.state.token) {
//             config.headers.Authorization = `token ${store.state.token}`
//         }
//         return config
//     },
//     err => {
//         return Promise.reject(err)
//     },
// )
//
// // http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 401 清除token信息并跳转到登录页面
//                     store.commit(types.LOGOUT)
//
//                     // 只有在当前路由不是登录页面才跳转
//                     router.currentRoute.path !== 'login' &&
//                     router.replace({
//                         path: 'login',
//                         query: { redirect: router.currentRoute.path },
//                     })
//             }
//         }
//         // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
//         return Promise.reject(error.response.data)
//     },
// )
export default api;
