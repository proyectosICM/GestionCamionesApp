import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Button, Card } from "react-native-elements";
import { styles } from "../../../Styles/General";
import { ColorTexto } from "../../../Styles/PaletaColores";

export function ObservacionesItem({ name }) {
  return (
    <Card>
      <View style={{ width: 250 }}>
        <Card.Title><Text style={{color: ColorTexto}}>{name}</Text></Card.Title>
      </View>
    </Card>
  );
}
