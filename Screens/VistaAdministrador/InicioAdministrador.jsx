import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';

export function InicioAdministrador({ navigation }) {
  const handleAdminOption = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de Administración (Tablas CRUD)
    // Por ejemplo:
    navigation.navigate('Menu-CRUD');
  };

  const handleMalEstadoOption = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de Vehículos en mal estado
    // Por ejemplo:
    navigation.navigate('VehiculosMalEstadoScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Buenos días, Administrador</Text>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>Administración (Tablas CRUD)</Card.Title>
        <Card.Divider />
        <Text style={styles.cardText}>
          Aquí puedes agregar una descripción o información adicional
          sobre la opción de Administración.
        </Text>
        <Button
          title="Ver más"
          buttonStyle={styles.cardButton}
          onPress={handleAdminOption}
        />
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Card.Title>Vehículos en mal estado</Card.Title>
        <Card.Divider />
        <Text style={styles.cardText}>
          Aquí puedes agregar una descripción o información adicional
          sobre la opción de Vehículos en mal estado.
        </Text>
        <Button
          title="Ver más"
          buttonStyle={styles.cardButton}
          onPress={() => navigation.navigate('Menu-Camion')}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  tittleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
});
