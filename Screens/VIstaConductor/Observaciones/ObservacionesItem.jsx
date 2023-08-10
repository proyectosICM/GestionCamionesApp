import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Button, Card } from "react-native-elements";

export function ObservacionesItem({ name }) {
  return (
    <Card>
      <View style={{ width: 250 }}>
        <Card.Title>{name}</Card.Title>
      </View>
    </Card>
  );
}
