import React, { useState, useEffect, useCallback } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../../Styles/General";
import { useRoute } from "@react-navigation/native";
import { ReparacionesURL } from "../../../API/apiurl";
import axios from "axios";
import { HistorialReparaciones } from "./HistorialReparaciones";
import { ScrollView } from "react-native";
import { Alert } from "react-native";

export function AgregarReparacion() {
  const [textoInput, setTextoInput] = useState("");
  const [token, setToken] = useState();
  const [usuario, setUsuario] = useState();

  const route = useRoute();
  const rgs = route.params.rgs;

  const datosAsync = useCallback(async () => {
    const tokenv = await AsyncStorage.getItem("token");
    const usuariov = await AsyncStorage.getItem("usuario");
    setToken(tokenv);
    setUsuario(usuariov);
  }, []);

  useEffect(() => {
    datosAsync();
  }, [datosAsync]);

  const handleEnviar = async () => {
    if (textoInput == "") {
      Alert.alert("Por favor detalle la reparacion realizada");
    } else {
      console.log("Texto ingresado:", textoInput);
      setTextoInput("");
      console.log(rgs);
      console.log(usuario);

      try {
        const requestData = {
          titulo: textoInput,

          usuariosModel: {
            id: usuario,
          },
          rgsModel: {
            id: rgs,
          },
        };
        const response = await axios.post(
          ReparacionesURL, // Debes proporcionar la URL correcta aquí
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data); // Puedes acceder a los datos de respuesta aquí
        console.log("Enviado a reparacion");
      } catch (error) {
        console.log(error);
        console.log(ReparacionesURL);
        const requestData = {
          titulo: textoInput,

          usuariosModel: {
            id: usuario,
          },
          rgsModel: {
            id: rgs,
          },
        };
        console.log(requestData);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Agregar Reparacion</Text>
      <TextInput
        style={localStyles.input}
        placeholder="Detalle la reparacion realizada"
        value={textoInput}
        onChangeText={(text) => setTextoInput(text)}
      />
      <Button title="Enviar" onPress={handleEnviar} />

      <View style={{ height: "40%" }}>
        <ScrollView>
          <HistorialReparaciones rgsp={rgs} />
        </ScrollView>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  input: {
    width: 240,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
