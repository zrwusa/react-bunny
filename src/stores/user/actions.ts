import {EUser} from "./constants";
import {IFillAuthPayload, IReqGetAuthPayload} from "./payloads";

import api from "../../common/api";
import {IThunkResult} from "../thunk";
import {AxiosError} from "axios";

export interface IFillAuthAction {
    type: EUser.FILL_AUTH;
    payload: IFillAuthPayload;
}

export const fillAuthAction: (payload: IFillAuthPayload) => IFillAuthAction = (payload) => {
    return {
        type: EUser.FILL_AUTH,
        payload: payload,
    };
};

export interface IGetAuthErrorAction {
    type: EUser.GET_AUTH_ERROR;
    payload: AxiosError;
}

export const getAuthErrorAction: (payload: AxiosError) => IGetAuthErrorAction = (payload) => {
    return {
        type: EUser.GET_AUTH_ERROR,
        payload: payload,
    };
};

export const getAuthFillOrClear = (data:IReqGetAuthPayload): IThunkResult<Promise<void>> => (dispatch) => {
    const retPromise = api.post(`/auth/login`, data)
        .then((res) => {
            dispatch(fillAuthAction(res.data))
        })
        .catch((err:AxiosError) => {
            dispatch(getAuthErrorAction(err))
        });
    return retPromise;
};

export type UserAction = IFillAuthAction | IGetAuthErrorAction;
