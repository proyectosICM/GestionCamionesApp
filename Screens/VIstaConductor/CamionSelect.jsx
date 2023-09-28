import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../Styles/General";
import { BotonesCamionAsignado } from "./BotonesCamionAsignado";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { usuarioURL } from "../../API/apiurl";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { fondo } from "../../Styles/PaletaColores";
import QRCodeGenerator from "./GeneradorQR";

export function CamionSelect() {
  const fondo1 = require("../../Styles/fondo5.jpg");
  const [usuarioid, setUsuarioid] = useState();
  const [userData, setUserData] = useState();
  const [countdown, setCountdown] = useState(2);
  const route = useRoute();
  const navigation = useNavigation();
  const actualizar = route.params?.actualizar;

  const obtenerDatos = useCallback(async () => {
    const usuarioidv = await AsyncStorage.getItem("usuario");
    setUsuarioid(usuarioidv);
  }, []);

  const ListarInfoUser = useListarElementos(`${usuarioURL}/${usuarioid}`, setUserData);

  useEffect(() => {
    ListarInfoUser();
    obtenerDatos();
    if (actualizar != undefined) {
      obtenerDatos();
      ListarInfoUser();
    }
    //ListarInfoUser()
    if (actualizar) {
      obtenerDatos();
      ListarInfoUser();
      navigation.setParams({ actualizar: false });
    }
  }, [obtenerDatos, ListarInfoUser]);

  const handleCargarCamion = () => {
    obtenerDatos();
    ListarInfoUser();
  };

  useEffect(() => {
    if (actualizar) {
      handleCargarCamion();
    }
  }, [actualizar]);

  return (
    <ImageBackground source={fondo} style={styles.backgroundImage}>
      <View style={styles.container}>
        {userData && userData.rgsModel ? (
          <>
            {/*
              <View style={{ marginTop: 30, marginBottom: 20 }}>
                <QRCodeGenerator idRgs={userData.rgsModel && userData.rgsModel.id} />
              </View>
        */}

            <Text style={styles.tittleText}>Placa Camion: {userData.rgsModel && userData.rgsModel.checkListCamionModel.camionesModel.placa}</Text>
            <Text style={styles.tittleText}>Placa Tracto: {userData.rgsModel && userData.rgsModel.checkListCarretaModel.camionesModel.placa}</Text>
            <BotonesCamionAsignado datos={userData} />
          </>
        ) : (
          <>
            <Text style={styles.tittleText}>No hay Camion Asignado</Text>
            <Text style={[styles.tittleText, { textAlign: "center" }]}>Por favor escanee el QR de un camion libre</Text>
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
