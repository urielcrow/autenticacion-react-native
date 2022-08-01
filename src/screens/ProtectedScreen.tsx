import React from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity,StyleSheet, LogBox, Vibration} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SpinnerFontAwesome from '../components/SpinnerFontAwesome';
import { AuthContext } from '../context/authContext';
import { useInfoUser } from '../hooks/useInfoUser';

LogBox.ignoreLogs([
    'Require cycle:',
]);

//type ImgTmp = string ;

export const ProtectedScreen = ()=> {

    const {sigOut} = React.useContext(AuthContext);
    const { load,dataUser } = useInfoUser();
    const [imgTmp, setImgTmp] = React.useState<string>();

    const ONE_SECOND_IN_MS = 1000;

    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS
    ];

    const camera = ()=>{
        launchCamera({
            mediaType : 'video',
            //quality: 0.7
        },(resp)=>{
            if(resp.didCancel) 
                return;

            if( !resp.assets![0].uri ) 
                return;

            Vibration.vibrate(PATTERN)

            setImgTmp(resp.assets![0].uri);
        });
    }

    const galery = ()=>{
        launchImageLibrary({
            mediaType : 'photo',
            quality: 0.7,
        },(resp)=>{

            if(resp.didCancel) 
                return;
                
            if( !resp.assets![0].uri ) 
                return;

            setImgTmp(resp.assets![0].uri);

        });
    }

    if(load){
        return(
            <View style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center'
            }}>
                {/* <ActivityIndicator size={60} color='#2471A3'/> */}
                <SpinnerFontAwesome name="spinner" size={60} color='#2471A3'/>
            </View>
        )
    }

    return (
        <View>
            <Text>ProtectedScreen</Text>
            <Text>{dataUser.nombre}</Text>
            {
                imgTmp ?

                <Image 
                    source = {{
                        uri : imgTmp
                    }}
                    style={{
                        width:150,
                        height:150
                    }}
                />
                    :
                
                <Image 
                    source = {{
                        uri : dataUser.avatar
                    }}
                    style={{
                        width:150,
                        height:150
                    }}
                />
            }

            <View style={{
                flexDirection:'row',
                justifyContent:'center'
            }}>
                <TouchableOpacity 
                    style={{...styles.btnLogin,...styles.shadow}}
                    activeOpacity={.8}
                    onPress={camera}
                >
                    <View style={{paddingVertical:5,paddingHorizontal:20, flexDirection:'row'}}>
                        <FontAwesome name="camera" color="white" size={35}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{...styles.btnLogin,...styles.shadow}}
                    activeOpacity={.8}
                    onPress={galery}
                >
                    <View style={{paddingVertical:5,paddingHorizontal:20, flexDirection:'row'}}>
                        <FontAwesome name="image" color="white" size={35}/>
                    </View>
                </TouchableOpacity>

            </View>

            <TouchableOpacity 
                style={{...styles.btnLogin,...styles.shadow}}
                activeOpacity={.8}
                onPress={sigOut}
            >
                <View style={{paddingVertical:5,paddingHorizontal:20, flexDirection:'row'}}>
                    <Text style={{color:'white',fontSize:20,marginRight:8}}>Salir</Text>
                    <FontAwesome name="long-arrow-right" color="white" size={35}/>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
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
    }
})
