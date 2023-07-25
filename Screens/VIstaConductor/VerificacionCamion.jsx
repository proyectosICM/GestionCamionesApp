import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { useState } from 'react';
import { Touchable } from 'react-native';
import QRScanner from '../../QRScanner';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function VerificacionCamion({ navigation }) {
  const [abrir, setAbrir] = useState(false);
  const handleAbrirCamera = () => {
    setAbrir(true);
  }
  const token = AsyncStorage.getItem('token');
  const handleCerrarCamera = () => {
    setAbrir(false);
  }

  return (
    abrir ? <QRScanner cerrar={handleCerrarCamera} navigate={navigation.navigate}/> :
      <View style={styles.container}>
        <Text>Escanear QR de camion</Text>
        <Text></Text>
        <TouchableOpacity onPress={handleAbrirCamera}>
          <Text>Abrir cámara</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200, // Agrega un tamaño mínimo para la vista
  },  checklistButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
