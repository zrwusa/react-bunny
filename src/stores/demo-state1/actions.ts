import {EDemoState1Action} from "./constants";
import {IDemoState1Action1Payload, IDemoState1Action2Payload} from "./payloads";

export interface IDemoState1Action1 {
    type: EDemoState1Action.ACTION_ONE;
    payload: IDemoState1Action1Payload;
}

export interface IDemoState1Action2 {
    type: EDemoState1Action.ACTION_TWO;
    payload: IDemoState1Action2Payload;
}

export const demoState1Action1: (payload: IDemoState1Action1Payload) => IDemoState1Action1 = (payload) => {
    console.log("demoState1Action1 Action Creator");
    return {
        type: EDemoState1Action.ACTION_ONE,
        payload: payload,
    };
};

export const demoState1Action2: (payload: IDemoState1Action2Payload) => IDemoState1Action2 = (payload) => {
    console.log("demoState1Action2 Action Creator");
    return {
        type: EDemoState1Action.ACTION_TWO,
        payload: payload,
    };
};


export type IDemoState1Action = IDemoState1Action1 | IDemoState1Action2 ;
