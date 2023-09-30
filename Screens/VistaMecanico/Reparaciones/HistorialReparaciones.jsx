import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { View, ScrollView } from "react-native";
import { styles } from "../../../Styles/General";
import { useListarElementos } from "../../../Hooks/CRUDHook";
import { ReparacionxRGS } from "../../../API/apiurl";
import { Card } from "react-native-elements";
import { useRoute } from "@react-navigation/native";

export function HistorialReparaciones({ rgsp }) {
  const [historial, setHistorial] = useState();
  const [historial2, setHistorial2] = useState();
  const route = useRoute();
  const rid = route.params.rgsm;
  console.log(rgsp);
  console.log(rid);
  console.log("dsd");
  const listar = useListarElementos(`${ReparacionxRGS}${rgsp}`, setHistorial);
  const listar2 = useListarElementos(`${ReparacionxRGS}${rid}`, setHistorial2);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (rgsp) {
        listar();
      } else {
        listar2();
      }

      console.log("ds");
      console.log(historial);
      console.log(`${ReparacionxRGS}${rgsp}`);
      // Aquí puedes colocar la lógica que deseas que se ejecute cada segundo
    }, 1000); // 1000 milisegundos = 1 segundo

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [listar]);

  return (
    <View style={styles.container}>
      <Text style={[styles.tittleText, { width: "90%" }]}>
        Historial de reparaciones realizadas
      </Text>
      <ScrollView style={{width:"90%"}}>
        {rgsp &&
          historial &&
          historial.map((his) => (
            <View key={his.id} style={{ width: "100%" }}>
              <Card>
                <Text style={{ textAlign: "center" }}>{his.titulo}</Text>
              </Card>
            </View>
          ))}

        {rid &&
          historial2 &&
          historial2.map((his) => (
            <View key={his.id} style={{ width: "100%" }}>
              <Card>
                <Text style={{ textAlign: "center" }}>{his.titulo}</Text>
              </Card>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
