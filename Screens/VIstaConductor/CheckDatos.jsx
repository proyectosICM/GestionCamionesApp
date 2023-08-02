import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../Styles/General";

import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAgregarElemento, useEditarUnElemento } from "../../Hooks/CRUDHook";
import { checkListURL, usuarioURL } from "../../API/apiurl";
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
  const tiempo = route.params.tiempo;
  const navigation = useNavigation();

  const [camionid, setCamionid] = useState();
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    const obtenerDatosAsync = async () => {
      const camionidv = await AsyncStorage.getItem("camionid");
      const usuariov = await AsyncStorage.getItem("usuario");
      setCamionid(camionidv);
      setUsuario(usuariov);
    };

    obtenerDatosAsync();
  }, []);

  const convertirAMinutos = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos} minutos y ${segundosRestantes} segundos`;
  };

  const handleEnviar = async () => {
    const requestData = {
      camionesModel: {
        id: camionid,
      },
      usuariosModel: {
        id: usuario,
      },
      //Llantas
      revisarAjuste: datos[0][0],
      cortesYAverias: datos[0][1],
      revisarPresionRecomendada: datos[0][2],

      //Motor
      nivelesDeMotor: datos[1][0],
      sistemaDeLubricacionDeFugas: datos[1][1],
      sistemaDeCombustible: datos[1][2],

      // Sistema Electrico
      luces: datos[2][0],
      sistemaDeCarga: datos[2][1],
      mandosTablero: datos[2][2],
      sistemaDeArranque: datos[2][3],
      ruidosAnormalesSE: datos[2][4],
      otrosEquiposElectricos: datos[2][5],

      //Transmision
      embrague: datos[3][0],
      cajaDeCambio: datos[3][1],
      diferencial: datos[3][2],
      cardanes: datos[3][3],
      ruidosAnormalesT: datos[3][4],

      // Direccion
      seryo: datos[4][0],
      alineamiento: datos[4][1],
      pinesBocinasTerminales: datos[4][2],
      cajaDeDirecion: datos[4][3],

      // Frenos
      limpiezaYRegulacion: datos[5][0],
      presionDeAire: datos[5][1],
      frenoDeEstacionamiento: datos[5][2],

      // Suspension
      muellesBolsasDeAire: datos[6][0],
      amortiguadores: datos[6][1],
      ejesBarraEstabilizadora: datos[6][2],

      // Cabina
      carroceria: datos[7][0],
      chasis: datos[7][1],

      tiempo: tiempo,
    };
    //console.log(requestData);
    try {
      await useAgregarElemento(checkListURL, requestData);
      const cm = { id: camionid };
      await useEditarUnElemento(usuarioURL, usuario, "camionesModel", cm);
      navigation.navigate("VerificacionCarreta");
    } catch (error) {
      console.log("Error al enviar los datos:", error);
      // Maneja el error adecuadamente, muestra un mensaje de error o realiza otras acciones
    }
    //navigation.navigate("Asignado");
  };



  return (
    <ScrollView>
      <View style={styles.container}>
        {tables.map((table, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Text style={styles.tittleText}>{table.titulo}</Text>
            <View style={{ alignItems: "center" }}>
              {table.datos.map((dato, datoIndex) => (
                <View key={datoIndex}>
                  <Text>
                    {dato}
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
    </ScrollView>
  );
}
