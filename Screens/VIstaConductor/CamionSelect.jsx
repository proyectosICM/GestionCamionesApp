import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../Styles/General";

export function CamionSelect() {
  const [camionid, setCamionid] = useState();

  const obtenerCamionID = useCallback(async () => {
    const camionidv = await AsyncStorage.getItem("camionid");
    setCamionid(camionidv);
  }, []);

  useEffect(() => {
    obtenerCamionID();
    const interval = setInterval(obtenerCamionID, 5000); // Llama a obtenerCamionID cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, [obtenerCamionID]);

  useEffect(() => {
    console.log("Valor actual de camionid:", camionid);
  }, [camionid]);


  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Camion Seleccionado es: {camionid ? camionid : "d" } </Text>
    </View>
  );
}
