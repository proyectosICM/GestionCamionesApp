import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import { MenuCamiones } from "../Common/MenuCamiones";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { BotonCard, ColorTexto, ColorTextoBoton, fondo } from "../../Styles/PaletaColores";
import { styles as general} from "../../Styles/General";

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

  const [sede, setSede] = useState(null);

  const fetchData = useCallback(async () => {
    const sedev = await AsyncStorage.getItem("sede");
    setSede(sedev);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeshabilitados = async () => {
    await AsyncStorage.setItem("menucam", "deshabilitados");
    navigation.navigate("Menu-Camion");
  };

  const handlePendiente = async () => {
    await AsyncStorage.setItem("menucam", "pendiente");
    navigation.navigate("Menu-Camion");
  };

  const handleEnReparacion = async () => {
    await AsyncStorage.setItem("menucam", "enreparacion");
    navigation.navigate("Menu-Camion");
  };

  return (
    <ImageBackground source={fondo} style={general.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.tittleText}>Buenos días, Mecanico</Text>
        <Text style={styles.tittleText}>
          {" "}
          Sede: {sede ? sede : "Cargando.."}
        </Text>
        {/*  <Card containerStyle={styles.cardContainer}>
        <Card.Title>Ver Camiones Deshabilitados</Card.Title>
        <Card.Divider />
        <Text style={styles.cardText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
        <Button
          title="Ver más"
          buttonStyle={styles.cardButton}
          onPress={() => handleDeshabilitados()}
        />
  </Card> */}
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={{color: ColorTexto}}>Ver Camiones pendientes a reparacion</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <Button
            title="Ver más"
            buttonStyle={styles.cardButton}
            onPress={() => handlePendiente()}
            titleStyle={{color:ColorTextoBoton}}
          />
        </Card>

        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={{color: ColorTexto}}>Ver camiones en reparacion</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <Button
            title="Ver más"
            buttonStyle={styles.cardButton}
            titleStyle={{color:ColorTextoBoton}}
            onPress={() => handleEnReparacion()}
          />
        </Card>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    //backgroundColor: "#f0f0f0",
  },
  tittleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: ColorTexto
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
    color: ColorTexto
  },
  cardButton: {
    backgroundColor: BotonCard,
    borderRadius: 5,
  },
});

/* 

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
          onPress={() => handlePendientes()}
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

*/
