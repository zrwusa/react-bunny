import type {UserState, UserActions} from '../types';
import {EUser} from '../constants';
 const initialState: UserState = {
    user: {email: '', access_token: '', nickname: ''},
    isValid: false,
    fetching: false,
    fetched: false,
    error: 'errors default'
};

export function userReducer(state: UserState = initialState, action: UserActions): UserState {
    switch (action.type) {
        case EUser.LOGIN_SUCCESS: {
            // const myPayload = (<LoginSuccessPayload>payload);
            // localStorage.setItem('access_token',myPayload.access_token);
            return {
                ...state,
                ...action.payload,
            };
        }
        case EUser.LOGIN_FAILED: {
            return {
                ...state,
                error: JSON.stringify(action.payload),
            };
        }
        case EUser.LOGOUT: {
            return {
                ...state,
                user: {
                    access_token: '',
                    email: '',
                    nickname: ''
                },
            };
        }
        default:
            return state;
    }
}


