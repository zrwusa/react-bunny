
import {IDemoState1,IDemoState2} from "./demo-state1/models";
import {IUserState} from "./user/models";
import {IDemoThunk} from "./demo-thunk/models";
export * from "./demo-state1/models";
export * from "./demo-thunk/models";
export * from "./user/models";
export interface IRootState {
    demoState1: IDemoState1;
    demoState2: IDemoState2;
    user:IUserState;
    demoThunk:IDemoThunk
}

