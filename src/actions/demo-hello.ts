import type {
    DemoHelloAction1,
    DemoHelloAction1Payload,
    DemoHelloAction2,
    DemoHelloAction2Payload
} from '../types';
import {EDemoHelloAction} from '../constants';

export const demoHelloAction1: (payload: DemoHelloAction1Payload) => DemoHelloAction1 = (payload) => {
    return {
        type: EDemoHelloAction.FIRST,
        payload: payload,
    };
};

export const demoHelloAction2: (payload: DemoHelloAction2Payload) => DemoHelloAction2 = (payload) => {
    return {
        type: EDemoHelloAction.SECOND,
        payload: payload,
    };
};
