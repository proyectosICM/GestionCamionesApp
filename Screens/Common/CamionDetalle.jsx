import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CamionDetalle() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => console.log('Atrás')}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>
      <Text style={styles.placaText}>Placa</Text>
      <Text style={styles.marcaText}>Marca</Text>
      <Text style={styles.modeloText}>Modelo</Text>
      <TouchableOpacity style={styles.checklistButton} onPress={() => console.log('Realizar checklist')}>
        <Text style={styles.checklistButtonText}>Realizar checklist</Text>
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
  },
  backButton: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  placaText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  marcaText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modeloText: {
    fontSize: 18,
    marginBottom: 20,
  },
  checklistButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checklistButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
