import type {SystemState} from '../types';
import {SystemActions} from '../types';
import {ESystemAction} from '../constants';

export const initialState: SystemState = {
    requests: [],
    errors: [],
};

export function systemReducer(state: SystemState = initialState, action: SystemActions): SystemState {
    switch (action.type) {
        case ESystemAction.REQUEST: {
            return {
                requests: [...state.requests, action.payload],
                errors: state.errors
            };
        }
        case ESystemAction.REQUEST_FAILED: {
            return {
                requests: state.requests,
                errors: [...state.errors, action.payload]
            };
        }
        default:
            return state;
    }
}


