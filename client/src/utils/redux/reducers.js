import { SIGN_IN, SIGN_OUT, UPDATE_TOKEN, SAVED_DATE } from "./actions";

export const initialState = {
    LOGGED_IN: false,
    USER: null,
    TOKEN: null,
    SAVED_DATE: null
}

export const reducer = (state = initialState, action) => { 
    switch (action.type) {
        case SIGN_IN:
            localStorage.removeItem('id_token');
            localStorage.setItem('id_token', action.payload);
            return {
                ...state,
                LOGGED_IN: true,
                USER: action.payload.user,
                TOKEN: action.payload.token
            }
        case SIGN_OUT:
            localStorage.removeItem('id_token');
            return {
                ...state,
                LOGGED_IN: false,
                USER: null,
                TOKEN: null
            }
        case UPDATE_TOKEN:
            localStorage.setItem('id_token', action.payload);
            return {
                ...state,
                TOKEN: action.payload
            }
        case SAVED_DATE:
            console.log("Date updated:", action.payload);
            return {
                ...state,
                SAVED_DATE: action.payload
            }
        default:
            return state;
    }
}
