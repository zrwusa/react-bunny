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
    response => {
        console.log(response.headers);
        return response;
    },
    async function (error) {
        if (error.response === undefined) {
            console.warn(`[React Bunny Warn]Request failed,first do not forget to run the mock server in another terminal with command 'yarn mock'`);
        }
        const originalRequestConfig = error.config;
        debugger
        const {response} = error;
        if (!response) return Promise.reject(error);
        const {status} = response;
        if (!status) return Promise.reject(error);

        if (status === 403 && !originalRequestConfig._retry) {
            originalRequestConfig._retry = true;
            // const access_token = await refreshAccessToken();

            const access_token = '';
            axios.defaults.headers.common['Authorization'] = `Bearer ` + access_token;
            return api(originalRequestConfig);
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
