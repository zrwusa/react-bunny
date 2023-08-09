import {AxiosError} from 'axios';
import api from '../helpers/api';
import type {ThunkResult, DemoThunkReqPayload, DemoThunkSuccessAction, DemoThunkSuccessPayload} from '../types';
import {EDemoThunkAction} from '../constants';
import {bunnyRequestAction, bunnyRequestFailedAction} from './system';

export const demoThunkSuccessAction: (payload: DemoThunkSuccessPayload) => DemoThunkSuccessAction = (payload) => {
    return {
        type: EDemoThunkAction.DEMO_THUNK_SUCCESS,
        payload: payload,
    };
};

export const demoThunkAction = (data: DemoThunkReqPayload): ThunkResult<Promise<void>> =>
    async (dispatch) => {
        const axiosConfig = {method: 'POST', data, url: `/demo-thunks`};
        dispatch(bunnyRequestAction(axiosConfig));
        try {
            const response = await api.request(axiosConfig);
            dispatch(demoThunkSuccessAction(response.data));
        } catch (err) {
            dispatch(bunnyRequestFailedAction(err as AxiosError));
        }
    };
