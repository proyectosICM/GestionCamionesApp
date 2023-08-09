import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../Styles/General";
import { Button, Icon } from "react-native-elements";
import { StyleSheet } from "react-native";
import { BotonesCamionAsignado } from "./BotonesCamionAsignado";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { usuarioURL } from "../../API/apiurl";
import { useNavigation, useRoute } from "@react-navigation/native";

export function CamionSelect() {
  const [usuarioid, setUsuarioid] = useState();
  const [userData, setUserData] = useState();
  const [countdown, setCountdown] = useState(2); // Inicializa el contador en 2 segundos
  const route = useRoute();
  const navigation = useNavigation();
  const actualizar = route.params?.actualizar;

  const obtenerDatos = useCallback(async () => {
    const usuarioidv = await AsyncStorage.getItem("usuario");
    setUsuarioid(usuarioidv);
  }, []);

  const ListarInfoUser = useListarElementos(
    `${usuarioURL}/${usuarioid}`,
    setUserData
  );

  useEffect(() => {
    ListarInfoUser();
    obtenerDatos();
    if (actualizar != undefined) {
      obtenerDatos();
      ListarInfoUser();
      console.log("Yas");
    }
    //ListarInfoUser()
    if (actualizar) {
      console.log("sd");
      obtenerDatos();
      ListarInfoUser(); // Realizar la actualización
      navigation.setParams({ actualizar: false }); // Restablecer el parámetro
    }
  }, [obtenerDatos, ListarInfoUser]);

  useEffect(() => {
    console.log("Valor actual de camionid:", usuarioid);
  }, [usuarioid]);

  const handleCargarCamion = () => {
    obtenerDatos();
    ListarInfoUser();
  };

  useEffect(() => {
    if (actualizar) {
      console.log("Es ", actualizar);
      handleCargarCamion();
    }
  }, [actualizar]);

  return (
    <View style={styles.container}>
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
        <>
          <Text>No hay Camion Asignado</Text>
          {/*    <Button
            title={"Cargar el camion asignado"}
            onPress={() => handleCargarCamion()}
      /> */}
        </>
      )}
    </View>
  );
}
