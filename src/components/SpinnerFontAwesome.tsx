import React,{ useEffect } from 'react';
import { Animated,Easing } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Icon{
    name:string,
    color? : string,
    size? : number
}

const SpinnerFontAwesome = ({name,color='white',size=20}:Icon)=>{

    const spinValue = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(Animated.timing(spinValue, {
          toValue: 1, duration: 1500, easing: Easing.linear, useNativeDriver: true
        })).start()
    }, [])

    const rotateAnimation = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return(
        <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
            <FontAwesome name={name} color={color} size={size}/>
        </Animated.View>

    )

}


export default SpinnerFontAwesome;
