import { createStore, applyMiddleware, combineReducers } from "redux";
import {demoState1Reducer} from "./demo-state1";
import {userReducer} from "./user";
import thunkMiddleware from 'redux-thunk';
import {demoThunkReducer} from "./demo-thunk";

const rootReducer = combineReducers({
    demoState1: demoState1Reducer,
    demoThunk:demoThunkReducer,
    user:userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
