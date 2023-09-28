import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../Styles/General";

import { ScrollView } from "react-native";
import { Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAgregarElemento, useEditarUnElemento } from "../../Hooks/CRUDHook";
import { FallasImagenURL, RGS_URL, checkListCamionURL, checkListCarretaURL, checkListExpresoURL, checkListURL, usuarioURL } from "../../API/apiurl";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tablesCam, tablesCarr } from "../../API/datosCLConductor";
import { servicioExpress } from "../../API/datosCLMecanico";
import axios from "axios";
import { Alert } from "react-native";

export function CheckDatos() {
  const [tables, setTables] = useState(tablesCam);

  const route = useRoute();

  const tc = route.params.tc;
  const tablesD = route.params.tablesD;
  const ide = route.params.ide;

  useEffect(() => {
    if (tc == "Camion") {
      setTables(tablesCam);
    } else if (tc == "Carreta") {
      setTables(tablesCarr);
    }
  }, [tc]);

  const datos = route.params.datos;
  const rol = route.params.rol;
  console.log("ds·", datos);

  const tiempo = route.params.tiempo;
  const navigation = useNavigation();

  const [camionid, setCamionid] = useState();
  const [usuario, setUsuario] = useState();
  const [rgs, setRgs] = useState();
  const [token, setToken] = useState();
  //const [rol, setRol] = useState();

  useEffect(() => {
    const obtenerDatosAsync = async () => {
      const camionidv = await AsyncStorage.getItem("camionid");
      const usuariov = await AsyncStorage.getItem("usuario");
      const rolv = await AsyncStorage.getItem("rol");
      const rgsv = await AsyncStorage.getItem("rgs");
      const tokenv = await AsyncStorage.getItem("token");
      setCamionid(camionidv);
      setUsuario(usuariov);
      setRgs(rgsv);
      setToken(tokenv);
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
        console.log("ed")
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

        const requestRGS = {
          checkListCamionModel: { id: data.id },
          estado: true,
          reparacion: false,
        };
   
        const RGS = await useAgregarElemento(RGS_URL, requestRGS);

        await AsyncStorage.setItem("rgs", RGS.data.id.toString());
        //console.log(RGS.data.id);

        Alert.alert(
          "Desea Agregar fotos",
          "",
          [
            {
              text: "Sí",
              onPress: () => navigation.navigate("Adjuntar Fotos", { rgs: RGS.data.id, clc: "continuar" }), // Redirección a la pantalla de imagen
            },
            {
              text: "No",
              onPress: () => navigation.navigate("VerificacionCarreta"), // Redirección a la pantalla CheckListCarreta
              style: "cancel",
            },
          ],
          { cancelable: false }
        );

        navigation.navigate("VerificacionCarreta");
      } else if (tc === "Carreta") {
        const carretaURL = checkListCarretaURL;

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

        const { data } = await useAgregarElemento(checkListCarretaURL, requestData);

        const requestRGS = {
          checkListCarretaModel: { id: data.id },
        };
        console.log("dsd 2 -> ");
        console.log("e " + rgs);

        const rgsRequest = {
          checkListExpresoModel: { id: data.id },
        };

        const d = { id: data.id };

        console.log("e22", rgs);
        await useEditarUnElemento(RGS_URL, rgs, `checkListCarretaModel`, d);

        //console.log("e22", ide);
        const cm = { id: rgs };
        await useEditarUnElemento(usuarioURL, usuario, "rgsModel", cm);

        Alert.alert(
          "Desea Agregar fotos",
          "",
          [
            {
              text: "Sí",
              onPress: () => navigation.navigate("Adjuntar Fotos", { rgs: rgs, clc: "cerrar"  }), // Redirección a la pantalla de imagen
            },
            {
              text: "No",
              onPress: () => navigation.navigate("Asignado", { actualizar: true }), // Redirección a la pantalla CheckListCarreta
              style: "cancel",
            },
          ],
          { cancelable: false }
        );

        navigation.navigate("Asignado", { actualizar: true });
        console.log("Fin");
      } else if (tc === "Expreso") {
        const carretaURL = checkListCarretaURL;
        const rgsURL = RGS_URL;

        const requestData = {
          // rgsModel: { id: 1 },
          ...datos.reduce((acc, dataGroup, index) => {
            dataGroup.forEach((dataItem, itemIndex) => {
              const atributo = servicioExpress[index].datos[itemIndex].atributo;
              acc[atributo] = dataItem;
            });
            return acc;
          }, {}),
        };

        const { data } = await useAgregarElemento(checkListExpresoURL, requestData);

        console.log(data.id);
        console.log(ide);

        const rgsRequest = {
          checkListExpresoModel: { id: data.id },
        };

        const cm = { id: data.id };
        console.log(RGS_URL, " ", rgs);
        console.log(ide);

        useEditarUnElemento(RGS_URL, ide, `checkListExpresoModel`, cm);
        /*
        try {
          await axios.put(`${RGS_URL}/${ide}`, rgsRequest, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.log(error);
          throw error;
        }
*/
        Alert.alert(
          "Desea Agregar fotos",
          "",
          [
            {
              text: "Sí",
              onPress: () => navigation.navigate("Adjuntar Fotos", { rgs: rgs }), // Redirección a la pantalla de imagen
            },
            {
              text: "No",
              onPress: () => navigation.navigate("Inicio"), // Redirección a la pantalla CheckListCarreta
              style: "cancel",
            },
          ],
          { cancelable: false }
        );

        navigation.navigate("Inicio");
      } else {
        console.log("no tipo");
      }
    } catch (error) {
      //console.log("Error al enviar los datos:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>{rol}</Text>
        {tablesD &&
          tablesD.map((table, index) => (
            <View key={index} style={{ alignItems: "center" }}>
              <Card>
                <Text style={styles.tittleText}>{table.titulo}</Text>
                <View style={{ alignItems: "center" }}>
                  {table.datos.map((dato, datoIndex) => (
                    <View key={datoIndex}>
                      <>
                        <Text>
                          <Card.Title> {dato.nombre}</Card.Title>
                          {datos[index][datoIndex] ? (
                            <>
                              <Text style={{ color: "green" }}>
                                {" "}
                                Buen estado <Icon name="check" size={20} color="green" />
                              </Text>
                            </>
                          ) : (
                            <Text style={{ color: "red" }}>
                              {" "}
                              Mal estado <Icon name="close" size={20} color="red" />
                            </Text>
                          )}
                        </Text>
                      </>
                    </View>
                  ))}
                </View>
              </Card>
            </View>
          ))}
        <Text>{camionid ? camionid : "no hay"}</Text>
        <Text style={styles.tittleText}>Tiempo: {convertirAMinutos(tiempo)}</Text>
        <Button title={"Confirmar Envio de datos"} onPress={() => handleEnviar()} />
      </View>
    </ScrollView>
  );
}
