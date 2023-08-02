import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const QRScanner = ({cerrar, navigate, tc}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);



  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async({ data }) => {
    setScanned(true);
    cerrar();
    //alert(`Código QR escaneado: ${data}`);
    await AsyncStorage.setItem('camionid', data);
    navigate('Detalles', {tc : tc} ); 
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No se ha otorgado el permiso para acceder a la cámara.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.preview}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)} style={styles.scanAgain}>
          <Text style={styles.scanAgainText}>Escanear de nuevo</Text>
        </TouchableOpacity>
      )}
        <TouchableOpacity onPress={() => cerrar()} style={styles.scanAgain}>
          <Text style={styles.scanAgainText}>Cerrar Camara</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scanAgain: {
    padding: 15,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  scanAgainText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QRScanner;