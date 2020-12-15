import {EUser} from "./constants";
import {IUserState} from "./models";
import {UserAction} from "./actions";
// import {ILoginSuccessPayload} from "./payloads";

export const initialState: IUserState = {
    access_token: "",
    name: "name default",
    isValid: false,
    fetching: false,
    fetched: false,
    error:"errors default"
};

export function userReducer(state: IUserState = initialState, {type, payload}: UserAction): IUserState {
    switch (type) {
        case EUser.LOGIN_SUCCESS: {
            // const myPayload = (<ILoginSuccessPayload>payload);
            // localStorage.setItem('access_token',myPayload.access_token);
            return {
                ...state,
                ...payload,
            };
        }
        case EUser.LOGIN_FAILED: {
            return {
                ...state,
                error:JSON.stringify(payload),
            };
        }
        case EUser.LOGOUT: {
            debugger
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}


