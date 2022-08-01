import { AuthState } from "../context/AuthContext"

export type action = 
    { type : 'logIn' } | 
    { type : 'logOut' } |
    { type : 'validateExistToken', payload : {isLoggedIn : boolean, verifyAuntenticate: boolean}}



export const authReducer = (state : AuthState , action : action) : AuthState  => {
    switch (action.type) {
        case 'logIn':
            return {
                ...state,
                isLoggedIn :true,
                verifyAuntenticate : true
            };
        case 'logOut':
            return {
                ...state,
                isLoggedIn : false,
                verifyAuntenticate : true
            };
        case 'validateExistToken':
            return {
                ...state,
                isLoggedIn : action.payload.isLoggedIn,
                verifyAuntenticate : action.payload.verifyAuntenticate,
            };
        default:
            return state;
    }
}


