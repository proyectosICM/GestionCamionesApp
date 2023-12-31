import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Touchable } from "react-native";
import QRScanner from "../../QRScanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../Styles/General";
import { Button } from "react-native-elements";
import { ColorIcono, fondo } from '../../Styles/PaletaColores';
import { ImageBackground } from 'react-native';
import { BackHandler } from 'react-native';
import { useBackHandler } from '../../Hooks/backHandler';

export default function InicioMecanico({ navigation }) {
  const [abrir, setAbrir] = useState(false);
  const [user, setUser] = useState('');
  
  useBackHandler(navigation);

/*
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp(); // Cierra la aplicación si estás en la pantalla "Inicio" y no hay usuario
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

*/
  useEffect(() => {
    // Función asincrónica para obtener el valor de 'user' de AsyncStorage
    const getUserFromAsyncStorage = async () => {
      try {
        const userValue = await AsyncStorage.getItem('user');
        if (userValue !== null) {
          setUser(userValue);
        }
      } catch (error) {
        console.log("Error al obtener el usuario de AsyncStorage:", error);
      }
    };
 
    // Llamar a la función para obtener el valor de 'user' al cargar el componente
    getUserFromAsyncStorage();

    // Actualizar el valor de 'user' cada 5 segundos
    const interval = setInterval(getUserFromAsyncStorage, 500);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []); // El arreglo vacío [] asegura que este efecto solo se ejecute una vez al montar el componente

  const handleAbrirCamera = () => {
    setAbrir(true);
  }; 

  const handleCerrarCamera = () => {
    setAbrir(false);
  }; 

  const  handleMenu = async() => {
    await AsyncStorage.setItem('menucam', 'habilitados')
    navigation.navigate('Menu-Camion')
  }

  return abrir ? (
    <QRScanner cerrar={handleCerrarCamera} navigate={navigation.navigate} tc={"Camion"} />
  ) : (
    <ImageBackground source={fondo}  style={styles.backgroundImage}>
    <View style={styles.container}>
      {/*
      <Text style={styles.tittleText}>
        Escanear QR de camion
      </Text>
      <Text></Text>
      <Button
        title=" Abrir Camara "
        type="outline"
        buttonStyle={styles.styleButton}
        titleStyle={styles.textoButton}
        icon={{
          name: 'camera',
          type: 'font-awesome',
          size: 25,
          color: ColorIcono,
        }}
        iconRight
        onPress={handleAbrirCamera}
      />
      <Text style={styles.tittleText}>O</Text>
  */}

      <Button
        title=" Buscar Camion en Menu "
        type="outline"
        buttonStyle={styles.styleButton}
        titleStyle={styles.textoButton}
        icon={{
          name: 'search', 
          type: 'font-awesome',
          size: 25,
          color: ColorIcono,
        }}
        iconRight
        onPress={() => handleMenu() }
      />
    </View>
    </ImageBackground>
  );
}
