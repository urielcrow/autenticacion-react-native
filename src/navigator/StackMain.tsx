import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { AuthContext } from '../context/authContext';
import { ActivityIndicator, View, AppState, Text} from 'react-native';
import { getToken } from '../api/token';

const Stack = createStackNavigator();

export const StackMain = ()=> {

  const {state:{isLoggedIn,verifyAuntenticate},dispatch} = React.useContext(AuthContext);
  
    const verificarExistenciaToken = async()=>{
    
        const t = await getToken();
        
        if(t){
          dispatch({
              type: 'validateExistToken',
              payload : {
                verifyAuntenticate: true,
                isLoggedIn : true
              }
          });
        }
        else{
          dispatch({
              type: 'validateExistToken',
              payload : {
                verifyAuntenticate: true,
                isLoggedIn : false
              }
          });
        }
        
    }


    React.useEffect(() => {

      verificarExistenciaToken();
      
      const subscription = AppState.addEventListener('change',(status)=>{
        if(status === "active")
          verificarExistenciaToken();
      });

      return()=>{
        subscription.remove();
      }

    }, []);

   
  if(!verifyAuntenticate)
    return(
      <View style={{
        flex:1
        ,justifyContent:'center'
      }}>
        <ActivityIndicator />
        <Text style={{textAlign:'center'}}>Cargando aplicación...</Text>
      </View>
    )


  return (

    <Stack.Navigator
        screenOptions={{
            headerShown : false,
            cardStyle: {
                backgroundColor : 'white'
            }
        }}
    >
      
      {
        !isLoggedIn ? 
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
                    : 
          <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
      }
      
    </Stack.Navigator>

  );
}