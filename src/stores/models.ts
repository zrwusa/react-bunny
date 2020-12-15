
import {IDemoHelloState,IDemoState2} from "./demo-state1/models";
import {IUserState} from "./user/models";
import {IDemoThunk} from "./demo-thunk/models";
export * from "./demo-state1/models";
export * from "./demo-thunk/models";
export * from "./user/models";
export interface IRootState {
    demoHelloState: IDemoHelloState;
    demoState2: IDemoState2;
    userState:IUserState;
    demoThunkState:IDemoThunk
}

