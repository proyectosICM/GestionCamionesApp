import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { styles } from "../../Styles/General";
import { Button } from "react-native-elements";
import { useState } from "react";
import { RGS_URL } from "../../API/apiurl";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { useEffect } from "react";
import { useListarElementos } from "../../Hooks/CRUDHook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkListCamionURL } from "./../../API/apiurl";
import { tablesCam, tablesCarr } from "../../API/datosCLConductor";
import { servicioExpress } from "./../../API/datosCLMecanico";

export function VerCL() {
  const [camion, setCamion] = useState([]);
  const [rol, setRol] = useState();
  const [camionid, setCamionid] = useState();
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.id;

  const datosAsync = useCallback(async () => {
    const rolv = await AsyncStorage.getItem("rol");
    const camionidv = await AsyncStorage.getItem("camionid");
    setRol(rolv);
    setCamionid(camionidv);
  }, []);

  useEffect(() => {
    datosAsync();
  }, [datosAsync]);

  const ListarCamion = useListarElementos(`${RGS_URL}/${id}`, setCamion);

  useEffect(() => {
    ListarCamion();
  }, [ListarCamion]);

  const handleGo = (op, datos) => {
    if (op === "Camion") {
      navigation.navigate("Ver Datos", {
        datos: camion.checkListCamionModel,
        tc: "Camion",
        rol: rol,
        tablesD: datos,
      });
    } else if (op === "Carreta") {
      navigation.navigate("Ver Datos", {
        datos: camion.checkListCarretaModel,
        tc: "Carreta",
        rol: rol,
        tablesD: datos,
      });
    } else if (op === "Expreso") {
      navigation.navigate("Ver Datos", {
        datos: camion.checkListCamionModel,
        tc: "Camion",
        rol: rol,
        tablesD: datos,
      });
    }
  };
  console.log("hola p2s", camion.checkListCarretaModel);
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      <Button
        title={"Ver CheckList Camion"}
        buttonStyle={styles.styleButton}
        titleStyle={styles.textoButton}
        onPress={() => handleGo("Camion", tablesCam)}
      />
      <Button
        title={"Ver CheckList Carreta"}
        buttonStyle={styles.styleButton}
        titleStyle={styles.textoButton}
        onPress={() => handleGo("Carreta", tablesCarr)}
      />
      <Button
        title={"Ver CheckList Servicio Expreso"}
        buttonStyle={styles.styleButton}
        titleStyle={styles.textoButton}
        onPress={() => handleGo("Expreso", servicioExpress)}
      />
      <Button
        title={"Ver Imagenes de falla"}
        buttonStyle={styles.styleButton}
        titleStyle={styles.textoButton}
        onPress={() => navigation.navigate('Galeria', {idRgs: id})}
      />
    </View>
  );
}
