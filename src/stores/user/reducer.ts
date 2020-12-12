import {EUser} from "./constants";
import {IUserState} from "./models";
import {UserAction} from "./actions";

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
        case EUser.FILL_AUTH: {
            return {
                ...state,
                ...payload,
            };
        }
        case EUser.GET_AUTH_ERROR: {
            return {
                ...state,
                error:JSON.stringify(payload),
            };
        }
        default:
            return state;
    }
}


