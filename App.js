import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import Login from './Screens/Login/Login';
import CamionDetalle from './Screens/Common/CamionDetalle';
import { Tabla } from './Screens/Common/Tabla';
import { Button } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckList from './Screens/VIstaConductor/CheckList';
import VerificacionCamion from './Screens/VIstaConductor/VerificacionCamion';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomBottomTabBar } from './CustomBottomTabBar';
import IncioMecanico from './Screens/VistaMecanico/InicioMecanico';
import { MenuCamiones } from './Screens/Common/MenuCamiones';
import { MenuCrud } from './Screens/Common/CRUD/MenuCrud';
import { Redirigir } from './Screens/Login/Redirigir';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cargando } from './Screens/Common/Cargando';




export default function App() {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const [user, setUser] = useState(null);

  const ListarUser = async () => {
    const rolValue = await AsyncStorage.getItem('rol');
    setUser(rolValue);
  }

  useEffect(() => {
    ListarUser();
  }, [ListarUser]);

  return (

    <NavigationContainer>
      <Stack.Navigator>
      {user ? (
          <Stack.Screen name='Redirigir2' component={Redirigir} />
        ) : (
          <Stack.Screen name='Login-' component={Login} /> 
        )}

        <Stack.Screen name='Login' component={Login} /> 
        <Stack.Screen
          name="Inicio"
          component={CustomBottomTabBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='InicioMecanico' component={IncioMecanico} />

        <Stack.Screen name='VerificacionCamion' component={VerificacionCamion} />
        <Stack.Screen name='Detalles' component={CamionDetalle} />
        <Stack.Screen name='CheckList' component={CheckList} />

        <Stack.Screen name='InicioMecanico2' component={IncioMecanico} />

        <Stack.Screen name='Menu-Camion' component={MenuCamiones} />
        <Stack.Screen name='Menu-CRUD' component={MenuCrud} />

        <Stack.Screen name='Redirigir' component={Redirigir} />
        <Stack.Screen name='Cargando' component={Cargando} />
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
