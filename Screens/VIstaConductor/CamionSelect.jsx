import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../Styles/General";
import { Button, Icon } from "react-native-elements";
import { StyleSheet } from "react-native";
import { BotonesCamionAsignado } from "./BotonesCamionAsignado";
import CamionDetalle from "../Common/CamionDetalle";
import { DetallePanel } from "../Common/DetallePanel";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { usuarioURL } from "../../API/apiurl";

export function CamionSelect() {
  const [usuarioid, setUsuarioid] = useState();
  const [userData, setUserData] = useState();

  const obtenerDatos = useCallback(async () => {
    const usuarioidv = await AsyncStorage.getItem("usuario");
    setUsuarioid(usuarioidv);
  }, []);

  useEffect(() => {
    obtenerDatos();
    console.log("1");
    //const interval = setInterval(obtenerDatos, 1000);
    //return () => clearInterval(interval);
  }, [obtenerDatos]);

  const ListarInfoUser = useListarElementos(
    `${usuarioURL}/${usuarioid}`,
    setUserData
  );

  useEffect(() => {
    ListarInfoUser();
  }, [ListarInfoUser]);

  useEffect(() => {
    console.log("Valor actual de camionid:", usuarioid);
  }, [usuarioid]);

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.tittleText}>
            Placa Camion: {userData.camionesModel.placa}
          </Text>
          <Text style={styles.tittleText}>Placa Tracto: {userData.camionesModel.placa}</Text>
        </>
      ) : (
        <Text>No hay Camion Asignado</Text>
      )}
      <BotonesCamionAsignado />
    </View>
  );
}
