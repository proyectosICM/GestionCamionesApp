import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

export function MenuCrud({ navigation }) {
  const handleSedesOption = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de Sedes
    // Por ejemplo:
    navigation.navigate('SedesScreen');
  };

  const handleTrabajadoresOption = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de Trabajadores
    // Por ejemplo:
    navigation.navigate('TrabajadoresScreen');
  };

  const handleConductoresOption = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de Conductores
    // Por ejemplo:
    navigation.navigate('ConductoresScreen');
  };

  const handleCamionesOption = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de Camiones
    // Por ejemplo:
    navigation.navigate('CamionesScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Icon name="building" type="font-awesome" size={50} />
        <Card.Title>Sedes</Card.Title>
        <Button
          title="Ir"
          buttonStyle={styles.cardButton}
          onPress={handleSedesOption}
        />
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Icon name="users" type="font-awesome" size={50} />
        <Card.Title>Trabajadores</Card.Title>
        <Button
          title="Ir"
          buttonStyle={styles.cardButton}
          onPress={handleTrabajadoresOption}
        />
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Icon name="car" type="font-awesome" size={50} />
        <Card.Title>Conductores</Card.Title>
        <Button
          title="Ir"
          buttonStyle={styles.cardButton}
          onPress={handleConductoresOption}
        />
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Icon name="truck" type="font-awesome" size={50} />
        <Card.Title>Camiones</Card.Title>
        <Button
          title="Ir"
          buttonStyle={styles.cardButton}
          onPress={handleCamionesOption}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  cardButton: {
    marginTop: 10,
  },
});
