import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../Styles/General";
import { Button, Icon } from "react-native-elements";
import { StyleSheet } from "react-native";
import { BotonesCamionAsignado } from "./BotonesCamionAsignado";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { usuarioURL } from "../../API/apiurl";

export function CamionSelect() {
  const [usuarioid, setUsuarioid] = useState();
  const [userData, setUserData] = useState();
  const [countdown, setCountdown] = useState(2); // Inicializa el contador en 2 segundos

  const obtenerDatos = useCallback(async () => {
    const usuarioidv = await AsyncStorage.getItem("usuario");
    setUsuarioid(usuarioidv);
  }, []);

  const ListarInfoUser = useListarElementos(
    `${usuarioURL}/${usuarioid}`,
    setUserData
  );

  useEffect(() => {
    obtenerDatos();
    const interval = setInterval(() => {
      ListarInfoUser();
      setCountdown(2); // Reinicia el contador a 2 segundos
    }, 2000); // Llama cada 2 segundos

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [obtenerDatos, ListarInfoUser]);

  useEffect(() => {
    console.log("Valor actual de camionid:", usuarioid);
  }, [usuarioid]);

  useEffect(() => {
    // Actualiza el contador regresivo cada segundo
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => Math.max(prevCountdown - 1, 0));
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Próxima actualización en: {countdown} segundos</Text>
      {userData ? (
        <>
          <Text>{userData.rgsModel.id}</Text>
          <Text style={styles.tittleText}>
            Placa Camion:{" "}
            {userData.rgsModel.checkListCamionModel.camionesModel.placa}
          </Text>
          <Text style={styles.tittleText}>
            Placa Tracto:{" "}
            {userData.rgsModel.checkListCarretaModel.camionesModel.placa}
          </Text>
          <BotonesCamionAsignado datos={userData} />
        </>
      ) : (
        <Text>No hay Camion Asignado</Text>
      )}
    </View>
  );
}
