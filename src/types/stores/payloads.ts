import type {AxiosRequestConfig} from 'axios';

export interface DemoThunkReqPayload {
    content: string;
}

export interface DemoThunkSuccessPayload {
    text: string;
}

export interface IDemoThunkRequestPayload {
    config: AxiosRequestConfig;
}

export interface DemoHelloAction1Payload {
    order: number;
}

export interface DemoHelloAction2Payload {
    name: string;
}

export interface ReqLoginPayload {
    email: string;
    password: string;
}

export interface LoginSuccessPayload {
    accessToken: string;
}

export interface LogoutPayload {
    email: string;
}



