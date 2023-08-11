import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import VerificacionCamion from "./Screens/VIstaConductor/VerificacionCamion";
import CamionDetalle from "./Screens/Common/CamionDetalle";
import IncioMecanico from "./Screens/VistaMecanico/InicioMecanico";
import { Cuenta } from "./Screens/Common/Cuenta";
import { Configuracion } from "./Screens/Common/Configuracion";
import { InicioAdministrador } from "./Screens/VistaAdministrador/InicioAdministrador";
import { MenuTaller } from "./Screens/VistaMecanico/MenuTaller";
import { Cargando } from "./Screens/Common/Cargando";
import { CamionSelect } from "./Screens/VIstaConductor/CamionSelect";

const Tab = createBottomTabNavigator();

export function CustomBottomTabBar({ navigation }) {
  const [rol, setRol] = useState(null);

  useEffect(() => {
    // Función asincrónica para obtener el valor de 'user' de AsyncStorage
    const getUserFromAsyncStorage = async () => {
      try {
        const rolValue = await AsyncStorage.getItem("rol");
        if (rolValue !== null) {
          setRol(rolValue);
        }
      } catch (error) {
        console.log("Error al obtener el usuario de AsyncStorage:", error);
      }
    };

    // Llamar a la función para obtener el valor de 'user' al cargar el componente
    getUserFromAsyncStorage();

    // Actualizar el valor de 'user' cada 5 segundos
    const interval = setInterval(getUserFromAsyncStorage, 300);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#A69677", // Cambia este color al que prefieras para los íconos seleccionados
        tabBarInactiveTintColor: "#9CA4A6", // Cambia este color al que prefieras para los íconos no seleccionados
      }}
    >
      {/* Configurar las opciones de cada pantalla en el TabNavigator */}

      <Tab.Screen
        name="Home"
        component={
          rol === "CONDUCTOR"
            ? VerificacionCamion
            : rol === "MECANICO"
            ? IncioMecanico
            : rol === "ADMINISTRADOR"
            ? InicioAdministrador
            : Cargando
        }
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}
      />
      {rol === "CONDUCTOR" && (
        <Tab.Screen
          name="Asignado"
          component={CamionSelect}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="truck" color={color} size={size} />
            ),
          }}
        />
      )}
      {rol === "MECANICO" && (
        <Tab.Screen
          name="Taller"
          component={MenuTaller}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="wrench" color={color} size={size} />
            ),
          }}
        />
      )}

      {/*
        <Tab.Screen
          name="Configuracion"
          component={Configuracion}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />
        */}

      <Tab.Screen
        name="Cuenta"
        component={Cuenta}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
