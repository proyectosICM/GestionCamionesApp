import React from "react";
import { View } from "react-native";
import { styles } from "../../../Styles/General";
import { Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { StyleSheet } from "react-native";
import { ObservacionesItem } from "./ObservacionesItem";
import { ScrollView } from "react-native";
import { useState } from "react";
import { useListarElementos } from "../../../Hooks/CRUDHook";
import { useRoute } from "@react-navigation/native";
import { ObsxRgsURL } from "../../../API/apiurl";
import { useEffect } from "react";

export function Observaciones() {
  const [obs, setObs] = useState();
  const route = useRoute();
  const rgs = route.params.rgs;

  const ListarObservaciones = useListarElementos(`${ObsxRgsURL}${rgs}`, setObs);

  useEffect(() => {
    ListarObservaciones();
  }, [ListarObservaciones]);

  console.log(obs);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.tittleText}>Observaciones</Text>
        {obs && obs.reverse().map((dato) => <ObservacionesItem name={dato.nameObs} />)}
        <ObservacionesItem name="Cambio de llanta registrado: asfdsafd" />
        <ObservacionesItem name="Cambio de llanta registrado: asfdsafd" />
        <ObservacionesItem name="Cambio de llanta registrado: asfdsafd" />

      </ScrollView>
    </View>
  );
}

const cardStyles = StyleSheet.create({});
