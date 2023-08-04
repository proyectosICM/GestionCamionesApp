import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Button, Card } from "react-native-elements";

export function ObservacionesItem() {
  return (
    <Card>
      <View style={{ width: 250 }}>
        <Card.Title>Notificacion 1</Card.Title>
        <Text>Cambio de llantas registrado</Text>
        <Button title={"Ver"} />
      </View>
    </Card>
  );
}
