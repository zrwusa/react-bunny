import api from '../helpers/api';
import type {AxiosError, AxiosResponse} from 'axios';
import type {
    BunnyProtocol,
    ThunkResult,
    LoginFailedAction,
    LoginSuccessAction,
    LoginSuccessPayload,
    LogoutAction,
    LogoutPayload,
    ReqLoginPayload
} from '../types';
import {EUser} from '../constants';
import {bunnyRequestAction} from './system';


const loginSuccessAction: (payload: LoginSuccessPayload) => LoginSuccessAction = (payload) => {
    return {
        type: EUser.LOGIN_SUCCESS,
        payload: payload,
    };
};


const loginFailedAction: (payload: AxiosError) => LoginFailedAction = (payload) => {
    return {
        type: EUser.LOGIN_FAILED,
        payload: payload,
    };
};

export const loginAction = (data: ReqLoginPayload): ThunkResult<Promise<void>> => async (dispatch) => {
    const requestConfig = {method: 'POST', data, url: `/sessions`};
    dispatch(bunnyRequestAction(requestConfig))
    try {
        const res = await api.request<ReqLoginPayload, AxiosResponse<BunnyProtocol<LoginSuccessPayload>>>(requestConfig)
        const {code} = res.data.bizLogic;
        if (code === 'AUTH_0006') {
            const accessToken = res.headers['x-access-token'];
            const refreshToken = res.headers['x-refresh-token'];
            window.localStorage.setItem('ACCESS_TOKEN', accessToken);
            window.localStorage.setItem('REFRESH_TOKEN', refreshToken);
            accessToken && dispatch(loginSuccessAction({accessToken}));
        }
    } catch (err) {
        dispatch(loginFailedAction(err as AxiosError));
    }
};

export const logoutAction: (payload: LogoutPayload) => LogoutAction = (payload) => {
    return {
        type: EUser.LOGOUT,
        payload: payload,
    };
};