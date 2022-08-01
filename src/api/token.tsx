import AsyncStorage from '@react-native-async-storage/async-storage';

export const nameToken = 'X-Almer-Key';

export const getToken = async()=>{
    try {
        const value = await AsyncStorage.getItem(nameToken)
        if(value !== null) 
          return value;
      } catch(e) {
        console.log('error lectura token: ', e)
      }
}

export const setToken = async(token : string) =>{
    try {
        await AsyncStorage.setItem(nameToken,token)
      } catch (e) {
        console.log('error escritura token: ', e)
      }
}

export const removeToken = async()=>{
  try {
      await AsyncStorage.removeItem(nameToken);
    } catch(e) {
      console.log('error al destruir token: ', e)
    }
} 



