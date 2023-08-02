import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import Login from './Screens/Login/Login';
import CamionDetalle from './Screens/Common/CamionDetalle';
import { Tabla } from './Screens/Common/Tabla';
import { Button } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckList from './Screens/VIstaConductor/CheckListCamion';
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
import { CheckDatos } from './Screens/VIstaConductor/CheckDatos';
import { InfoDetallada } from './Screens/VIstaConductor/InformacionDetallada/InfoDetallada';
import { NotificacionesConductor } from './Screens/VIstaConductor/NotificacionesConductor/NotificacionesConductor';
import { RegistrarCambioLlantas } from './Screens/VIstaConductor/RegistarCambioLlantas/RegistrarCambioLlantas';
import { Observaciones } from './Screens/VIstaConductor/Observaciones/Observaciones';
import VerificacionCarreta from './Screens/VIstaConductor/VerificarCarreta';
import CheckListCamion from './Screens/VIstaConductor/CheckListCamion';
import CheckListCarreta from './Screens/VIstaConductor/CheckListCarreta';




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
        <Stack.Screen name='VerificacionCarreta' component={VerificacionCarreta} />
        <Stack.Screen name='Detalles' component={CamionDetalle} />
        <Stack.Screen name='CheckList Camion' component={CheckListCamion} />
        <Stack.Screen name='CheckList Carreta' component={CheckListCarreta} />

        <Stack.Screen name='InicioMecanico2' component={IncioMecanico} />

        <Stack.Screen name='Menu-Camion' component={MenuCamiones} />
        <Stack.Screen name='Menu-CRUD' component={MenuCrud} />

        <Stack.Screen name='Redirigir' component={Redirigir} />
        <Stack.Screen name='Cargando' component={Cargando} />

        <Stack.Screen name='CheckDatos' component={CheckDatos} />

        <Stack.Screen name='InfoDetallada' component={InfoDetallada} />

        <Stack.Screen name='Notificaciones-Conductor' component={NotificacionesConductor} />
        <Stack.Screen name='Cambio de llantas' component={RegistrarCambioLlantas} />
        <Stack.Screen name='Observaciones' component={Observaciones} />
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
