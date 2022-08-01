import React from 'react';
import { View, Text, TextInput,StyleSheet,Image, KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Alert} from 'react-native';
import { StackScreenProps }  from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SpinnerFontAwesome from '../components/SpinnerFontAwesome';
import { useForm, configInput} from '../hooks/useForm';
import { AuthContext } from '../context/authContext';


const data = {
    usuario : configInput( {val:"urielcrow@gmail.com", type:"mail", required:true} ),
    pass : configInput( {val:"RobMax2018@", type:"text", required:true} ) 
}

interface Props extends StackScreenProps <any,any>{};

export const LoginScreen = ( {navigation} : Props )=> {

    const cont = React.useRef(0);

    const [typeInput,setTypeInput] = React.useState(true);
    const [clickUser,setClickUser] = React.useState(false);
  
    const {form,changeInput,focus,blur,validateCustome} = useForm(data);
    const {sigIn} = React.useContext(AuthContext);

    
    const validateForm = async()=>{

        // Keyboard.dismiss();
        setClickUser(true);

        if(validateCustome()){
            Alert.alert(
                "Errores",
                "Revisa tus datos",
                [{ text: "OK" }]
            );
            setClickUser(false);
            return;
        }

        sigIn({
            usuario:form.usuario.val,
            pass:form.pass.val
        },setClickUser);

    }
  
    return (
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
       
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.container}>

                    <Image 
                        source={
                            require('../assets/crow.png')
                        }
                        style={{
                            width:94,
                            height:119
                        }}
                    />

                    <View>
                        <Text style={{
                                fontSize:25,
                                color:'white',
                                marginBottom:20
                            }}>
                            Bienvenido
                        </Text>
                    </View>

                    <View style={{...styles.background,...styles.shadow}}>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='email-address'
                            value={form.usuario.val}
                            onChangeText={(val)=>changeInput(val,'usuario')}
                            onFocus={()=>focus('usuario')}
                            onBlur={()=>blur('usuario')}
                            //onSubmitEditing={validateForm}
                        />
                        <Text style={ (form.usuario.focus || form.usuario.val !== "") ? styles.placeholderFocus : styles.placeholder}>
                            Usuario
                        </Text>

                        <FontAwesome name="user" color="gray" size={35}/>

                       {
                            form.usuario.error && 
                                <View style={styles.viewAlert}>
                                    <Text style={{color:'white',paddingRight:6}}>  Obligatorio</Text>
                                    <FontAwesome name="exclamation-triangle" color="white" size={35}/>
                                </View>
                        }
                    </View>


                    <View style={{...styles.background, ...styles.shadow,marginTop:30}}>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry = {typeInput}
                            value={form.pass.val}
                            onChangeText={(val)=>changeInput(val,'pass')}
                            onFocus={()=>focus('pass')}
                            onBlur={()=>blur('pass')}
                            //onSubmitEditing={validateForm}
                        />
                         <Text style={ (form.pass.focus || form.pass.val !== "") ? styles.placeholderFocus : styles.placeholder}>
                            Contraseña
                        </Text>
                       
                        <TouchableOpacity
                            onPress={()=>setTypeInput(!typeInput)}
                        >
                            <FontAwesome name={ typeInput ? 'eye-slash' : 'eye' } color="gray" size={35}/>
                        </TouchableOpacity>

                        {
                            form.pass.error && 
                            <View style={styles.viewAlert}>
                                <Text style={{color:'white',paddingRight:6}}>  Obligatorio</Text>
                                <FontAwesome name="exclamation-triangle" color="white" size={35}/>
                            </View>
                        }


                    </View>

                   
                    <TouchableOpacity 
                        style={{...styles.btnLogin,...styles.shadow}}
                        activeOpacity={.8}
                        onPress={validateForm}
                        disabled={clickUser}
                    >
                        <View style={{paddingVertical:5,paddingHorizontal:20, justifyContent:'center',flexDirection:'row',minWidth:150}}>
                            {
                                !clickUser ?
                                <>
                                    <Text style={{color:'white',fontSize:20,marginRight:8}}>Login</Text>
                                    <FontAwesome name="long-arrow-right" color="white" size={35}/>
                                </>
                                        :
                                <SpinnerFontAwesome name="spinner" color="white" size={35}/>
                            }

                            
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{alignSelf:'flex-end'}}
                        onPress={()=>navigation.replace('RegisterScreen')}
                    >
                        <Text style={{
                                fontSize:18,
                                color:'white',
                                marginBottom:50,
                                marginTop:20,
                            }}
                            
                        >
                            Crear cuenta
                        </Text>
                    </TouchableOpacity>

                </View>
               
            </TouchableWithoutFeedback>
           
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#2471A3',
        paddingHorizontal:10
    },
    background:{
        backgroundColor:'#F3F1F3',
        borderRadius:50,
        height:40,
        paddingHorizontal:20,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    textInput:{
        flex:1,
        fontSize:18,
    },
    btnLogin:{
        backgroundColor:'#2471A3',
        borderColor:'white',
        borderWidth:2,
        borderRadius:100,
        marginTop:20,
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    placeholder:{
        position:'absolute',
        left:20,
        top:5,
        fontSize:20,
        opacity:.8
    },
    placeholderFocus:{
        position:'absolute',
        left:20,
        top:-22,
        fontSize:16,
        opacity:1,
        color:'white',
    },
    viewAlert:{
        paddingHorizontal:8,
        backgroundColor:'red',
        position:'absolute',
        right:0,
        top:0, 
        height:40,
        borderBottomRightRadius:50,
        borderTopRightRadius:50,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    }
    
})
