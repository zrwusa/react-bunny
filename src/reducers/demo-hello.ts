import type {DemoHelloState, DemoHelloActions} from '../types';
import {EDemoHelloAction} from '../constants';

const initialState: DemoHelloState = {
    name: 'name default',
    order: 0,
};

export function demoHelloReducer(state: DemoHelloState = initialState, action: DemoHelloActions): DemoHelloState {
    switch (action.type) {
        case EDemoHelloAction.FIRST: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case EDemoHelloAction.SECOND: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}


