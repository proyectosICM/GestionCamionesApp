import React from 'react'
import { View } from 'react-native';
import { styles } from '../../Styles/General';
import { Text } from 'react-native';
import { useState } from 'react';
import { useListarElementos } from '../../Hooks/CRUDHook';
import { useEffect } from 'react';
import QRCode from 'react-native-qrcode-svg';

export function Configuracion(){
    
    const data = '1'; 
    return (
      <View style={styles.container}>
        <QRCode
          value={data}
          size={200} // Tamaño del código QR
          color="black" // Color del código QR
          backgroundColor="white" // Color de fondo del código QR
        />
      </View>
    );
}