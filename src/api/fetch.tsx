import {getToken,nameToken} from './token';
const baseUrl = "https://aseemp.com.mx/control-vehicular/backend-cliente-almer/api";

type typeMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ParamsFetch{
    endpoint : string, 
    body? : string, 
    method? : typeMethod, 
    token? : boolean
}

interface Options{
    method : typeMethod, 
    headers? : Headers,
    body? : string
}

export const fetchCustome = async( params : ParamsFetch ) =>{

    const { 
        endpoint, 
        body = '', 
        method = 'GET', 
        token = false
    } = params;

    const url = `${ baseUrl }${ endpoint }`;

    let options : Options = {
        method
    }

    if(token)
        options.headers = await getHeaders();

    if(body !== '')
        options.body = body;

    const resp = await fetch(url, options);

    if (!resp.ok)
       throw Error(resp.status.toString());
    
    return await resp.json();
}

export const getHeaders = async() =>{
    let headers = new Headers();
    const token = await getToken() || '';
    headers.append(nameToken, token);
    return headers;
}
