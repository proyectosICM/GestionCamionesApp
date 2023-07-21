import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import VerificacionCamion from './Screens/VIstaConductor/VerificacionCamion';
import Login from './Screens/Login/Login';
import CamionDetalle from './Screens/Common/CamionDetalle';
import { Tabla } from './Screens/Common/Tabla';
import { Button } from 'react-native-elements';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckList from './Screens/VIstaConductor/CheckList';


export default function App() {

  const Stack = createNativeStackNavigator(); 

  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='VerificacionCamion' component={VerificacionCamion} />
          <Stack.Screen name='About' component={CheckList} />
          <Stack.Screen name='Detalles' component={CamionDetalle} />
          <Stack.Screen name='CheckList' component={CheckList} />
          {/* Rutas secundarias */}
        </Stack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
