import React from "react";
import { View, StyleSheet } from "react-native";
import { styles } from "../../../Styles/General";
import { Text } from "react-native";
import { Button } from "react-native-elements";
import { CambiarCamion } from "./CambiarCamion";
import { useState } from "react";
import { CambiarCarreta } from "./CambiarCarreta";
import { ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { fondo } from "../../../Styles/PaletaColores";

export function RegistrarCambioLlantas() {
  const fondo1 = require("../../../Styles/fondo5.jpg");
  const [mostrar, setMostrar] = useState(null);

  const SelectTC = (op) => {
    if (op == "camion") {
      setMostrar("camion");
    } else if (op == "carreta") {
      setMostrar("carreta");
    }
  };
  const rows = [[1, , 2], [[19], 20, [21], 22], [[23], 24, [25], 26], ["RP"]];
  return (
    <ImageBackground source={fondo} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Button
        title={" Camion"}
        titleStyle={styles.tittleText}
        buttonStyle={styles.buttonPalette}
        onPress={() => SelectTC("camion")}
        icon={<FontAwesome5 name="truck" size={20} color="white" />} // Agrega el icono aquí
      />

      <Button
        title={" Carreta"}
        titleStyle={styles.tittleText}
        buttonStyle={styles.buttonPalette}
        onPress={() => SelectTC("carreta")}
        icon={<FontAwesome5 name="truck-moving" size={20} color="white" />} // Agrega el icono aquí
      />
      {mostrar != null && (
        <>
          <Text style={styles.tittleText}>Cambio de llantas</Text>
          <Text style={styles.tittleText}>
            Seleccione la llanta cambiada en ruta {mostrar}
          </Text>

          {mostrar === "camion" ? (
            <CambiarCamion />
          ) : mostrar === "carreta" ? (
            <CambiarCarreta />
          ) : (
            <Text>Seleccione un boton</Text>
          )}
        </>
      )}
    </View>
    </ImageBackground>
  );
}
