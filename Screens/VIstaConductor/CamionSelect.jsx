import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../Styles/General";
import { Button, Icon } from "react-native-elements";
import { StyleSheet } from "react-native";
import { BotonesCamionAsignado } from "./BotonesCamionAsignado";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { fondoURL, usuarioURL } from "../../API/apiurl";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { fondo } from "../../Styles/PaletaColores";


export function CamionSelect() {
  const fondo1 = require("../../Styles/fondo5.jpg");
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

/*source={fondo1} */
  return (
    <ImageBackground source={fondo}  style={styles.backgroundImage}>
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
    </ImageBackground>
  );
}
