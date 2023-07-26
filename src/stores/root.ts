import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {demoHelloReducer, demoThunkReducer, systemReducer, userReducer} from '../reducers';

const rootReducer = combineReducers({
    demoHelloState: demoHelloReducer,
    demoThunkState: demoThunkReducer,
    userState: userReducer,
    systemState: systemReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
