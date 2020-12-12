import {EDemoState1Action} from "./constants";
import {IDemoState1} from "./models";
import {IDemoState1Action} from "./actions";

export const initialState: IDemoState1 = {
    name: "name default",
    order: 0,
};

export function demoState1Reducer(state: IDemoState1 = initialState, {type, payload}: IDemoState1Action): IDemoState1 {
    switch (type) {
        case EDemoState1Action.ACTION_ONE: {
            console.log(`${EDemoState1Action.ACTION_ONE} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        case EDemoState1Action.ACTION_TWO: {
            console.log(`${EDemoState1Action.ACTION_TWO} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}


