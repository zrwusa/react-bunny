import type {AnyAction} from 'redux';
import type {AxiosError, AxiosRequestConfig} from 'axios';
import type {
    DemoHelloAction1Payload,
    DemoHelloAction2Payload,
    DemoThunkSuccessPayload, LoginSuccessPayload,
    LogoutPayload
} from '../stores/payloads';
import {ESystemAction, EDemoHelloAction, EDemoThunkAction, EUser} from '../../constants';

export interface BunnyRequestAction extends AnyAction {
    type: ESystemAction.REQUEST;
    payload: AxiosRequestConfig;
}
export interface BunnyRequestFailedAction  extends AnyAction {
    type: ESystemAction.REQUEST_FAILED;
    payload: AxiosError;
}

export type SystemActions = BunnyRequestAction | BunnyRequestFailedAction;

export interface DemoThunkSuccessAction  extends AnyAction {
    type: EDemoThunkAction.DEMO_THUNK_SUCCESS;
    payload: DemoThunkSuccessPayload;
}

export type DemoThunkActions = DemoThunkSuccessAction;

export interface DemoHelloAction1 {
    type: EDemoHelloAction.FIRST;
    payload: DemoHelloAction1Payload;
}

export interface DemoHelloAction2 {
    type: EDemoHelloAction.SECOND;
    payload: DemoHelloAction2Payload;
}

export type DemoHelloActions = DemoHelloAction1 | DemoHelloAction2;

export interface LoginSuccessAction {
    type: EUser.LOGIN_SUCCESS;
    payload: LoginSuccessPayload;
}

export interface LoginFailedAction {
    type: EUser.LOGIN_FAILED;
    payload: AxiosError;
}

export interface LogoutAction {
    type: EUser.LOGOUT;
    payload: LogoutPayload;
}

export type UserActions = LoginSuccessAction | LoginFailedAction | LogoutAction;
