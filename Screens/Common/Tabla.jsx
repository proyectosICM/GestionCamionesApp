import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "../../Styles/General";

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
              <TouchableOpacity
                style={[
                  styles2.successButton,
                  //marcar[i] === true ? styles2.successButton : null,

                ]}
                onPress={() => handlePress(i, true)}
              >
                <FontAwesome
                  name="check"
                  size={10}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles2.dangerButton,
                  //marcar[i] === true ? styles2.dangerButton : null,
                ]}
                onPress={() => handlePress(i, false)}
              >
                <FontAwesome
                  name="times"
                  size={10}
                  color="white"
                />
              </TouchableOpacity>
              <View style={{ marginHorizontal: 10 }}>
                {marcar[i] === null ? (
                  <Text style={{ color: "black" }}>Sin estado</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 2
  },
  dangerButton: {
    borderColor: "red",
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 2
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
