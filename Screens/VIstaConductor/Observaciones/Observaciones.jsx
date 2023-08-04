import React from "react";
import { View } from "react-native";
import { styles } from "../../../Styles/General";
import { Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { StyleSheet } from "react-native";
import { ObservacionesItem } from "./ObservacionesItem";
import { ScrollView } from "react-native";

export function Observaciones() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.tittleText}>Observaciones</Text>
        <ObservacionesItem />
        <ObservacionesItem />
        <ObservacionesItem />
        <ObservacionesItem />
        <ObservacionesItem />
        <ObservacionesItem />
      </View>
    </ScrollView>
  );
}

const cardStyles = StyleSheet.create({});
