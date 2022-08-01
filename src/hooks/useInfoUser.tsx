import React from 'react';
import { Response , Result  } from '../interfaces/responseInterface';
import { fetchCustome } from '../api/fetch';


interface ResponseOverride extends Omit<Response,'result'> {
    result: ResultOverride;
}

interface ResultOverride extends Omit<Result, 'msg'>{
    msg : DataToken;
}

interface DataToken {
    query:  string;
    result: ResultDataToken;
}

interface ResultDataToken {
    acceso:     string;
    nombre:     string;
    avatar:     string;
    cliente:    string;
    id_cliente: string;
}

interface Data{
    load:boolean,
    dataUser:ResultDataToken
}

export const useInfoUser = ()=> {

    const [data,setData] = React.useState<Data>({
        load : true,
        dataUser: {} as ResultDataToken
    });

    const init = async()=>{
    
        try{
            const { result } : ResponseOverride  = await fetchCustome({
                    endpoint : '/autenticacion', 
                    method : 'GET', 
                    token:true
            });

            //const { result } : ResponseOverride =  resp;  

            setData({
                load:false,
                dataUser : result.msg.result,
            })
        }
        catch(e){
            console.log(`error screen: `, e)
        }
    }

    React.useEffect(() => {
        init();
    }, [])


   return{
        ...data
   }
}

