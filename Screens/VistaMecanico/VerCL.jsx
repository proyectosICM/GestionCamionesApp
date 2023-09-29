import React from "react";
import { Alert, View } from "react-native";
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
import { CLExcel, mensaje } from "../Common/ExcelCL";

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
        title={camion.checkListCamionModel ? "Ver CheckList Camion" : "No hay checklist de camion registrado"}
        buttonStyle={[styles.styleButton, { width: "80%", alignContent: "center", justifyContent: "center" }]}
        titleStyle={[styles.textoButton, { textAlign: "center", paddingHorizontal: "10%" }]}
        onPress={() => handleGo("Camion", tablesCam)}
      />
      <Button
        title={camion.checkListCarretaModel ? "Ver CheckList Carreta" : "No hay checklist de carreta registrados"}
        buttonStyle={[styles.styleButton, { width: "80%", alignContent: "center", justifyContent: "center" }]}
        titleStyle={[styles.textoButton, { textAlign: "center", paddingHorizontal: "10%" }]}
        onPress={() => handleGo("Carreta", tablesCarr)}
      />
      <Button
        title={camion.checkListExpresoModel ? "Ver CheckList Servicio Expreso" : "No hay checklist express registrados"}
        buttonStyle={[styles.styleButton, { width: "80%", alignContent: "center", justifyContent: "center" }]}
        titleStyle={[styles.textoButton, { textAlign: "center", paddingHorizontal: "10%" }]}
        onPress={() => handleGo("Expreso", servicioExpress)}
      />
      <Button
        title={"Ver Imagenes de falla"}
        buttonStyle={[styles.styleButton, { width: "80%"}]}
        titleStyle={[styles.textoButton, { textAlign: "center", paddingHorizontal: "10%" }]}
        onPress={() => navigation.navigate("Galeria", { idRgs: id })}
      />

      <Button
        title={"Colocar camion como pendiente a reparacion"}
        buttonStyle={[styles.styleButton, { width: "80%", backgroundColor:"blue" }]}
        titleStyle={[styles.textoButton, { textAlign: "center", paddingHorizontal: "10%" }]}
        onPress={() => navigation.navigate("Galeria", { idRgs: id })}
      /> 

      <Button
        title={"Descargar un archivo excel"}
        buttonStyle={[styles.styleButton, { width: "80%", backgroundColor:"green" }]}
        titleStyle={[styles.textoButton, { textAlign: "center", paddingHorizontal: "10%" }]}
        onPress={() => Alert.alert("No disponible aun" , "Esta funcion solo esta disponible desde el sistema web, aun no disponible en movil")}
      />
    </View>
  );
}
