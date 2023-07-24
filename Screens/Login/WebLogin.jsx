import React, { useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

const LoginScreen = () => {
  useEffect(() => {
    // Construir la URL con los parámetros de usuario y contraseña
    const username = 'mi_usuario'; // Aquí deberías obtener el nombre de usuario del formulario de inicio de sesión
    const password = 'mi_contraseña'; // Aquí deberías obtener la contraseña del formulario de inicio de sesión
    const loginURL = `http://mi_app_react_js/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    // Abrir la URL en un navegador integrado
    async function openURL() {
      try {
        await InAppBrowser.open(loginURL, {
          // Opciones adicionales para personalizar la apariencia y el comportamiento del navegador
          // Consulta la documentación de react-native-inappbrowser-reborn para más detalles
        });
      } catch (error) {
        console.log(error);
      }
    }

    // Verificar si el dispositivo admite InAppBrowser
    if (Platform.OS === 'android') {
      openURL();
    } else {
      Linking.openURL(loginURL);
    }
  }, []);

  return (
    <View>
      {/* Aquí puedes mostrar una página de carga o un mensaje */}
      <Text>Verificando inicio de sesión...</Text>
    </View>
  );
};

export default LoginScreen;
