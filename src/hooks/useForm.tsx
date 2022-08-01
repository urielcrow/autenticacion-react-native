import { useState } from 'react';




export const useForm = <T extends Object>( initialState : T ) => {


    const [form, setForm] = useState( initialState );

    const changeInput = (val:string,name:keyof T)=>{
        setForm({
            ...form,
            [name]:{
                ...form[name],
                error:false,//si el error se activa y el campo estaba seleccionado al escribir debo quitar el error
                val
            }
        });
    }

    const focus = (name:keyof T)=>{
        setForm({
            ...form,
            [name]:{
                ...form[name],
                focus: true,
                error:false//al hacer click en el campo con error debo quitarlo
            }
        });
    }

   

    const blur =( name:keyof T)=>{

        //form[name] : ParamsConfigInput; 

        if( form[name].val  !== "")
            return;
        
        setForm({
            ...form,
            [name]:{
                ...form[name],
                focus: false
            }
        });
    }

    const validateCustome = ()=>{

        let errores = false;
        let formTemp = {
            ...form
        };

        Object.keys(formTemp).forEach( (input : keyof T) =>{

            formTemp[input].error! = false;

            switch (formTemp[input].type) {
                case "text":
                        if( formTemp[input].val.trim() === "" && formTemp[input].required){
                            formTemp[input].error = true;
                            errores = true;
                        }
                break;

                case "mail":
                        if( formTemp[input].val.trim() === "" && formTemp[input].required){
                            formTemp[input].error = true;
                            errores = true;
                        }
                        else if( formTemp[input].val.trim() !== "" && !formTemp[input].val.trim().match(/^([a-zA-Z0-9._-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)  ){
                            formTemp[input].error = true;
                            errores = true;
                        }
                break;
            
                default:
                break;
            }
        });

        if(errores){
            setForm(formTemp);
        }

        return errores;
    }


    return {
        form,
        changeInput,
        focus,
        blur,
        validateCustome
    };
    
}

type TypesInputs = "text" | "mail";

interface ParamsConfigInput{
    val? : string,
    type? : TypesInputs,
    required? : boolean,
    focus? : boolean,
    error? : boolean
}


export const configInput = ( params : ParamsConfigInput)=>{

    const {
        val = '',
        type = "text",
        required = false,
        focus = false,
        error = false
    }  =  params;

    return{
        val,
        type,
        required,
        focus,
        error
    }
}
