import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import { MenuCamiones } from "../Common/MenuCamiones";

export function MenuTaller({ navigation }) {
  const handleAdminOption = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de Administración (Tablas CRUD)
    // Por ejemplo:
    navigation.navigate("Menu-CRUD");
  };

  const handleMalEstadoOption = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de Vehículos en mal estado
    // Por ejemplo:
    navigation.navigate("VehiculosMalEstadoScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Buenos días, Mecanico</Text>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>Ver Camiones pendientes a reparacion</Card.Title>
        <Card.Divider />
        <Text style={styles.cardText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
        <Button
          title="Ver más"
          buttonStyle={styles.cardButton}
          onPress={() => navigation.navigate('Menu-Camion')}
        />
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Card.Title>Ver camiones en reparacion</Card.Title>
        <Card.Divider />
        <Text style={styles.cardText}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  tittleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer: {
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 10,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
});
