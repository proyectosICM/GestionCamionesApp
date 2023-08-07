import React from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { styles } from "../../Styles/General";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Icon } from "react-native-elements";

export function VerDatos() {
  const [camion, setCamion] = useState([]);
  const [rol, setRol] = useState();
  const [camionid, setCamionid] = useState();
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.id;
  const tableD = route.params.tablesD;
  const datosAsync = useCallback(async () => {
    const rolv = await AsyncStorage.getItem("rol");
    const camionidv = await AsyncStorage.getItem("camionid");
    setRol(rolv);
    setCamionid(camionidv);
  }, []);

  useEffect(() => {
    datosAsync();
  }, [datosAsync]);

  const datos = route.params.datos;
  console.log("ssd", datos);

  return (
    <ScrollView>
      {tableD.map((table, index) => (
        <View key={index} style={{ alignItems: "center" }}>
          <Text style={styles.tittleText}>{table.titulo}</Text>
          <View style={{ alignItems: "center" }}>
            {table.datos.map((dato, datoIndex) => (
              <View key={datoIndex}>
                <Text>
                  {dato.nombre} :{" "}
                  {datos[dato.atributo] ? (
                    <Text style={{ color: "green" }}>
                      {" "}
                      Buen estado <Icon name="check" size={20} color="green" />
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
    </ScrollView>
  );
}
