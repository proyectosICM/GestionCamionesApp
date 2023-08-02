import React from 'react'
import { View } from 'react-native'
import { styles } from '../../../Styles/General'
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import { StyleSheet } from 'react-native';

export function PanelCDetalle({ tipoc, placa, marca, modelo }) {
  return (
    <Card containerStyle={localStyles.card}>
      <Text style={[styles.tittleText, { textAlign: 'center' }]}>{tipoc}</Text>
      <Text style={styles.tittleText}>Placa: {placa} </Text>
      <Text style={styles.tittleText}>Marca: {marca} </Text>
      <Text style={styles.tittleText}>Modelo:  {modelo} </Text>
    </Card>
  )
}

const localStyles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'white',
    elevation: 4, // For Android shadow
    shadowColor: 'rgba(0,0,0,0.2)', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 1, // For iOS shadow
    shadowRadius: 4, // For iOS shadow
    width: '90%',
    alignItems: 'center',
  }
});
