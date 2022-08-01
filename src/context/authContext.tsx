import React,{createContext,useReducer} from 'react';
import { Alert } from 'react-native';
import { action, authReducer } from '../reducers/authReducer';
import { fetchCustome } from '../api/fetch';
import { Response } from '../interfaces/responseInterface';
import { setToken, removeToken } from '../api/token';

export interface AuthState {
    isLoggedIn: boolean;
    verifyAuntenticate : boolean;
}

interface AuthContextProps{
    state :AuthState,
    dispatch : React.Dispatch<action>
    sigIn: (data:any,setClickUser: React.Dispatch<boolean>) => void,
    sigOut: () => void;
}

const authInitialState : AuthState = {
    isLoggedIn: false,
    verifyAuntenticate: false
}

export const AuthContext = createContext( {} as AuthContextProps );

export const AuthProvider = ( { children } : {children : JSX.Element | JSX.Element[]} )=>{

    const [state, dispatch] = useReducer(authReducer, authInitialState);
   
    const sigIn = async(data:any,setClickUser:React.Dispatch<boolean>) =>{

        try{
            const {result} : Response = await fetchCustome({
                    endpoint : '/autenticacion', 
                    body : JSON.stringify(data), 
                    method : 'POST', 
                });

            await setToken(result.msg);
                
            dispatch({
                type: 'logIn',
            });
        }
        catch(e){
            Alert.alert(
                "Error",
                "Datos incorrectos",
                [{ text: "OK" }]
            );
        }finally{
            setClickUser(false)
        }

    }

    const sigOut = async() =>{
        try{
            await removeToken();
            dispatch({
                type: 'logOut'
            });
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <AuthContext.Provider value={{
            state,
            dispatch,
            sigIn,
            sigOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}
