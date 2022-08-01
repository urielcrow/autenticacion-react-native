import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StackMain } from './src/navigator/StackMain';
import { AuthProvider } from './src/context/authContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackMain />
      </AuthProvider>
    </NavigationContainer>
  );
}