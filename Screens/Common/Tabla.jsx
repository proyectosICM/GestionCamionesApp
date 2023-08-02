import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card } from "react-native-elements";

export function Tabla({ titulo, datos, marcar, setMarcar }) {
  const handlePress = (index, estado) => {
    const newMarcar = [...marcar];
    newMarcar[index] = estado;
    setMarcar(newMarcar);
  };

  return (
    <View style={styles2.container}>
      <Card>
        <Card.Title>{titulo}</Card.Title>
        <Card.Divider />
        <View style={styles2.user}>
          <Text style={styles2.name}>Revise</Text>
          <Text style={styles2.name2}>Marque</Text>
          <Text style={styles2.name2}>Estado</Text>
        </View>

        {datos.map((u, i) => {
          return (
            <View key={i} style={styles2.user}>
              <Text style={styles2.name}>{u}</Text>
              <Button
         
                buttonStyle={[
                  styles2.successButton,
                  marcar[i] === true ? styles2.buttonActive : null,
                ]}
                titleStyle={styles2.buttonTitle}
                icon={{
                  name: "check",
                  type: "font-awesome",
                  size: 10,
                  color: "white",
                }}
                onPress={() => handlePress(i, true)}
              />
              <Button

                buttonStyle={[
                  styles2.dangerButton,
                  marcar[i] === false ? styles2.buttonActive : null,
                ]}
                titleStyle={styles2.buttonTitle}
                icon={{
                  name: "times",
                  type: "font-awesome",
                  size: 10,
                  color: "white",
                }}
                onPress={() => handlePress(i, false)}
              />
              <View style={{ marginHorizontal: 10 }}>
                {marcar[i] === null ? (
                  <Text style={{ color: "black" }}>
                    Sin estado
                  </Text>
                ) : marcar[i] ? (
                  <Text style={{ color: "green" }}>Buen estado</Text>
                ) : (
                  <Text style={{ color: "red" }}>Mal estado</Text>
                )}
              </View>
            </View>
          );
        })}
      </Card>
    </View>
  );
}

// Resto del código se mantiene igual

const styles2 = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
  },
  card: {
    width: "82%",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  successButton: {
    borderColor: "green",
    backgroundColor: "green",
  },
  dangerButton: {
    borderColor: "red",
    backgroundColor: "red",
  },
  buttonTitle: {
    color: "black",
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    width: "50%",
    marginTop: 5,
    textAlign: "center",

  },
  name2: {
    fontSize: 16,
    width: "20%",
    marginTop: 5,
    textAlign: "center",
    marginHorizontal: 6,
  },
});
