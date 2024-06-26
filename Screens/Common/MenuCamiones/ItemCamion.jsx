import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { FontAwesome } from "react-native-vector-icons/FontAwesome";
import { styles as general } from "../../../Styles/General";
import { servicioExpress } from "../../../API/datosCLMecanico";
import { ColorIcono, ColorTexto, ColorTextoBoton } from "../../../Styles/PaletaColores";
import { useListarElementos } from "../../../Hooks/CRUDHook";
import { RGS_CHabilitar, RGS_CReparar, RGS_URL } from "../../../API/apiurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export function ItemCamion({ id, title, title2, description, description2, estado, fecha, op, item, actualizar }) {
  const navigation = useNavigation();

  const handleCheck = () => {
    navigation.navigate("CheckList Camion", {
      tc: "Expreso",
      tablesD: servicioExpress,
      ide: id,
    });
  };

  const handleVerCheck = () => {
    navigation.navigate("Ver CheckLists", { id: id });
  };

  const [camion, setCamion] = useState();
  useListarElementos(`${RGS_URL}/${id}`, setCamion);

  const handleReparar = async () => {
    const token = await AsyncStorage.getItem("token");
    Alert.alert("Seguro de enviar el registro a reparar?", "Esta acción no se puede deshacer.", [
      {
        text: "No",
        onPress: () => {
          // Acción a realizar si el usuario selecciona "No"
          console.log("El usuario seleccionó No");
        },
        style: "cancel", // Opcional: estilo "cancel" para el botón "No"
      },
      {
        text: "Sí",
        onPress: async () => {
          // Acción a realizar si el usuario selecciona "Sí"
          console.log("El usuario seleccionó Sí");
          try {
            await axios
              .put(
                `${RGS_CReparar}${id}`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(console.log("ds"));
            console.log("Enviado a reparacion");
            actualizar();
          } catch (error) {
            console.error("Error al realizar la solicitud PUT:", error);
          }
          // Aquí puedes poner tu lógica para enviar el registro a reparar
        },
      },
    ]);
  };

  const handleHabilitar = async () => {
    const token = await AsyncStorage.getItem("token");
    Alert.alert("Seguro de acabar la repacion y habilitar el camion y carreta?", "Esta acción no se puede deshacer.", [
      {
        text: "No",
        onPress: () => {
          // Acción a realizar si el usuario selecciona "No"
          console.log("El usuario seleccionó No");
        },
        style: "cancel", // Opcional: estilo "cancel" para el botón "No"
      },
      {
        text: "Sí",
        onPress: async () => {
          // Acción a realizar si el usuario selecciona "Sí"
          console.log("El usuario seleccionó Sí");
          try {
            await axios.put(
              `${RGS_CHabilitar}${id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log("Enviado a reparacion");
            actualizar();
          } catch (error) {
            console.error("Error al realizar la solicitud PUT:", error);
            console.log(`${RGS_CHabilitar}${id}`);
          }
          // Aquí puedes poner tu lógica para enviar el registro a reparar
        },
      },
    ]);
  };

  const [fechaFormateada, setFechaFormateada] = useState();

  const formatearFecha = (timestamp) => {
    if (timestamp) {
      const fecha = new Date(timestamp);
      return fecha.toLocaleString();
    }
    return "";
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={{ textAlign: "center" }}>Codigo de Registro {id}</Text>
      <Text style={styles.title}>
        {title} - {title2}
      </Text>
      <Text style={{ textAlign: "center", color: ColorTexto }}>
        {description} - {description2}
      </Text>
      <Text style={{ textAlign: "center", color: ColorTexto }}>Fecha ultima modificacion {fecha && formatearFecha(fecha)}</Text>

      {estado ? (
        <View style={{ alignItems: "center" }}>
          <FontAwesome5 name="check" color="green" size={20} />
          <Text></Text>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <FontAwesome5 name="times" color="red" size={20} />
        </View>
      )}

      <Button title={"Ver"} buttonStyle={general.styleButton} titleStyle={general.textoButton} onPress={() => handleVerCheck()} />

      {camion && !camion.checkListExpresoModel && (
        <Button title={"Realizar CheckList"} buttonStyle={general.styleButton} titleStyle={general.textoButton} onPress={() => handleCheck()} />
      )}

      {/* camion && camion.checkListExpresoModel && (
        <Button title={"Colocar camion como pendiente a Reparacion"} buttonStyle={general.styleButton} titleStyle={general.textoButton} onPress={() => handleCheck()} />
      ) */}

      {op === "Pendiente" && (
        <>
          <Button
            title={"Solicitar Reparacion"}
            icon={
              <Icon
                name="wrench" // Aquí puedes cambiar el nombre del icono según el icono que desees usar
                type="font-awesome" // Puedes cambiar el tipo de icono según la librería de iconos que estés utilizando
                color={ColorIcono} // Puedes cambiar el color del icono
                size={24} // Puedes cambiar el tamaño del icono
              />
            }
            buttonStyle={general.styleButton}
            titleStyle={general.textoButton}
            onPress={() => handleReparar()}
          />
        </>
      )}

      {op === "enreparacion" && (
        <>
          <Button
            title={"Habilitar"}
            icon={
              <Icon
                name="wrench" // Aquí puedes cambiar el nombre del icono según el icono que desees usar
                type="font-awesome" // Puedes cambiar el tipo de icono según la librería de iconos que estés utilizando
                color={ColorIcono} // Puedes cambiar el color del icono
                size={24} // Puedes cambiar el tamaño del icono
              />
            }
            buttonStyle={general.styleButton}
            titleStyle={general.textoButton}
            onPress={() => handleHabilitar()}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 2, // Para sombra en Android
    shadowColor: "#000", // Para sombra en iOS
    shadowOffset: { width: 0, height: 2 }, // Para sombra en iOS
    shadowOpacity: 0.2, // Para sombra en iOS
    shadowRadius: 4, // Para sombra en iOS
    width: 160,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: ColorTexto,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: ColorTextoBoton,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
