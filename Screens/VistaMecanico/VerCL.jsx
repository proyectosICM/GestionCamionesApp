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
    if (op === "Camion" && camion.checkListCamionModel) {
      navigation.navigate("Ver Datos", {
        datos: camion.checkListCamionModel,
        tc: "Camion",
        rol: rol,
        tablesD: datos,
      });
    } else if (op === "Carreta" && camion.checkListCarretaModel) {
      navigation.navigate("Ver Datos", {
        datos: camion.checkListCarretaModel,
        tc: "Carreta",
        rol: rol,
        tablesD: datos,
      });
    } else if (op === "Expreso" && camion.checkListExpresoModel) {
      navigation.navigate("Ver Datos", {
        datos: camion.checkListExpresoModel,
        tc: "Camion",
        rol: rol,
        tablesD: datos,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={"Ver CheckList Camion"}
        buttonStyle={styles.styleButton}
        titleStyle={styles.textoButton}
        onPress={() => handleGo("Camion", tablesCam)}
      />
      <Button
        title={camion.checkListCarretaModel ? "Ver CheckList Carreta" : "No hay checklist de carreta registrados"}
        buttonStyle={styles.styleButton}
        titleStyle={styles.textoButton}
        onPress={() => handleGo("Carreta", tablesCarr)}
      />
      <Button
        title={camion.checkListExpresoModel ? "Ver CheckList Servicio Expreso": "No hay checklist express registrados"}
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
