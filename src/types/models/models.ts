import {AxiosError, AxiosRequestConfig} from 'axios';

export interface DemoThunkState {
    id: number,
    text: string,
}

export interface RootState {
    demoHelloState: DemoHelloState;
    demoState2: DemoState2;
    userState: UserState;
    demoThunkState: DemoThunkState;
}

export interface DemoHelloState {
    name: string;
    order: number;
}

export interface SystemState {
    requests: AxiosRequestConfig[],
    errors: AxiosError[]
}

export interface DemoState2 {
    company: string;
    companyId: string;
    job: string;
    jobId: string;
    isHighP: boolean;
}


export type DemoPost = {
    id: string,
    content: string,
};

export interface User {
    access_token: string,
    email: string,
    nickname: string,
}

export interface UserState {
    user: User;
    isValid: boolean;
    fetching: boolean,
    fetched: boolean,
    error: string,
}
