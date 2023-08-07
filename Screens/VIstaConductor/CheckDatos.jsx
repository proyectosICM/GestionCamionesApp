import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../Styles/General";

import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAgregarElemento, useEditarUnElemento } from "../../Hooks/CRUDHook";
import {
  RGS_URL,
  checkListCamionURL,
  checkListCarretaURL,
  checkListURL,
  usuarioURL,
} from "../../API/apiurl";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tablesCam, tablesCarr } from "../../API/datosCLConductor";

export function CheckDatos() {
  const [tables, setTables] = useState(tablesCam);

  const route = useRoute();

  const tc = route.params.tc;

  useEffect(() => {
    if (tc == "Camion") {
      setTables(tablesCam);
    } else if (tc == "Carreta") {
      setTables(tablesCarr);
    }
  }, [tc]);

  const datos = route.params.datos;
  const rol = route.params.rol;
  console.log("ds·", datos.sistemaDeArranque);

  const tiempo = route.params.tiempo;
  const navigation = useNavigation();

  const [camionid, setCamionid] = useState();
  const [usuario, setUsuario] = useState();
  const [clcamcond, setClcamcond] = useState();
  //const [rol, setRol] = useState();

  useEffect(() => {
    const obtenerDatosAsync = async () => {
      const camionidv = await AsyncStorage.getItem("camionid");
      const usuariov = await AsyncStorage.getItem("usuario");
      const rolv = await AsyncStorage.getItem("rol");
      const clccamcondv = await AsyncStorage.getItem("clcam");
      setCamionid(camionidv);
      setUsuario(usuariov);
      setClcamcond(clccamcondv);
      //setRol(rolv);
    };

    obtenerDatosAsync();
  }, []);

  const convertirAMinutos = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos} minutos y ${segundosRestantes} segundos`;
  };

  const handleEnviar = async () => {
    try {
      const camionId = await AsyncStorage.getItem("camionid");
      const usuario = await AsyncStorage.getItem("usuario");

      if (tc === "Camion") {
        const camionURL = checkListCamionURL;

        const requestData = {
          camionesModel: { id: camionId },
          tiempo: tiempo,
          ...datos.reduce((acc, dataGroup, index) => {
            dataGroup.forEach((dataItem, itemIndex) => {
              const atributo = tablesCam[index].datos[itemIndex].atributo;
              acc[atributo] = dataItem;
            });
            return acc;
          }, {}),
        };

        const { data } = await useAgregarElemento(camionURL, requestData);
        const cm = { id: camionId };
        await useEditarUnElemento(usuarioURL, usuario, "camionesModel", cm);
        await AsyncStorage.setItem("clcam", data.id.toString());
        navigation.navigate("VerificacionCarreta");
      } else if (tc === "Carreta") {
        const carretaURL = checkListCarretaURL;
        const rgsURL = RGS_URL;

        const requestData = {
          camionesModel: { id: camionId },
          tiempo: tiempo,
          ...datos.reduce((acc, dataGroup, index) => {
            dataGroup.forEach((dataItem, itemIndex) => {
              const atributo = tablesCarr[index].datos[itemIndex].atributo;
              acc[atributo] = dataItem;
            });
            return acc;
          }, {}),
        };

        const { data } = await useAgregarElemento(carretaURL, requestData);

        const rgsRequest = {
          checkListCamionModel: { id: clcamcond },
          checkListCarretaModel: { id: data.id },
        };

        const rgsResponse = await useAgregarElemento(rgsURL, rgsRequest);

        const cm = { id: rgsResponse.data.id };
        await useEditarUnElemento(usuarioURL, usuario, "rgsModel", cm);
        navigation.navigate("Asignado");
      } else if (tc === "Expreso") {
        const carretaURL = checkListCarretaURL;
        const rgsURL = RGS_URL;

        const requestData = {
          camionesModel: { id: camionId },
          tiempo: tiempo,
          ...datos.reduce((acc, dataGroup, index) => {
            dataGroup.forEach((dataItem, itemIndex) => {
              const atributo = tablesCarr[index].datos[itemIndex].atributo;
              acc[atributo] = dataItem;
            });
            return acc;
          }, {}),
        };

        const { data } = await useAgregarElemento(carretaURL, requestData);

        const rgsRequest = {
          checkListCamionModel: { id: clcamcond },
          checkListCarretaModel: { id: data.id },
        };

        const rgsResponse = await useAgregarElemento(rgsURL, rgsRequest);
v
        const cm = { id: rgsResponse.data.id };
        await useEditarUnElemento(usuarioURL, usuario, "rgsModel", cm);
        navigation.navigate("Asignado");
      }
    } catch (error) {
      console.log("Error al enviar los datos:", error);
    }
  };

  return (
    <ScrollView>
      {tc === "Camion" && (
        <View style={styles.container}>
          <Text>{rol}</Text>
          {tablesCam.map((table, index) => (
            <View key={index} style={{ alignItems: "center" }}>
              <Text style={styles.tittleText}>{table.titulo}</Text>
              <View style={{ alignItems: "center" }}>
                {table.datos.map((dato, datoIndex) => (
                  <View key={datoIndex}>
                    <Text>
                      {dato.nombre}
                      {datos[index][datoIndex] ? (
                        <Text style={{ color: "green" }}>
                          {" "}
                          Buen estado{" "}
                          <Icon name="check" size={20} color="green" />
                        </Text>
                      ) : (
                        <Text style={{ color: "red" }}>
                          {" "}
                          Mal estado <Icon name="close" size={20} color="red" />
                        </Text>
                      )}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
          <Text>{camionid ? camionid : "no jay"}</Text>
          <Text style={styles.tittleText}>
            Tiempo: {convertirAMinutos(tiempo)}
          </Text>
          <Button
            title={"Confirmar Envio de datos"}
            onPress={() => handleEnviar()}
          />
        </View>
      )}

      {tc === "Carreta" && (
        <View style={styles.container}>
          {tablesCarr.map((table, index) => (
            <View key={index} style={{ alignItems: "center" }}>
              <Text style={styles.tittleText}>{table.titulo}</Text>
              <View style={{ alignItems: "center" }}>
                {table.datos.map((dato, datoIndex) => (
                  <View key={datoIndex}>
                    <Text>
                      {dato.nombre}
                      {datos[index][datoIndex] ? (
                        <Text style={{ color: "green" }}>
                          {" "}
                          Buen estado{" "}
                          <Icon name="check" size={20} color="green" />
                        </Text>
                      ) : (
                        <Text style={{ color: "red" }}>
                          {" "}
                          Mal estado <Icon name="close" size={20} color="red" />
                        </Text>
                      )}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
          <Text>{camionid ? camionid : "no jay"}</Text>
          <Text style={styles.tittleText}>
            Tiempo: {convertirAMinutos(tiempo)}
          </Text>
          <Button
            title={"Confirmar Envio de datos"}
            onPress={() => handleEnviar()}
          />
        </View>
      )}
    </ScrollView>
  );
}
