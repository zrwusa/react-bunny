import type {DemoThunkState, DemoThunkActions} from '../types';
import {EDemoThunkAction} from '../constants';

const initialState: DemoThunkState = {
    text: 'text default',
    id: 0,
};

export function demoThunkReducer(state: DemoThunkState = initialState, action: DemoThunkActions): DemoThunkState {
    switch (action.type) {
        case EDemoThunkAction.DEMO_THUNK_SUCCESS: {
            console.log(`${EDemoThunkAction.DEMO_THUNK_SUCCESS} Invoked With Payload:${JSON.stringify(action.payload)}`);
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}


