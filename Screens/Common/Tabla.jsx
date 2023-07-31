import React from "react";
import { FlatList } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card, ListItem } from "react-native-elements";
import { CustomBottomTabBar } from "../../CustomBottomTabBar";
import { useState } from "react";

export function Tabla({ titulo, datos }) {
  const [marcar, setMarcar] = useState(null);

  const handlePress = (estado) => {
    setMarcar(estado);
  }

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
                type="outline"
                buttonStyle={styles2.successButton}
                titleStyle={styles2.buttonTitle}
                icon={{
                  name: "check",
                  type: "font-awesome",
                  size: 10,
                  color: "white",
                }}
                onPress={() => handlePress(true)}
              />
              <Button
                type="outline"
                buttonStyle={styles2.dangerButton}
                titleStyle={styles2.buttonTitle}
                icon={{
                  name: "times",
                  type: "font-awesome",
                  size: 10,
                  color: "white",
                }}
                onPress={() => handlePress(false)}
              />
              <Text>{marcar == null ? "Sin estado" : marcar ? "Buen estado" : "Mal estado"}</Text>
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
    backgroundColor: "green"
  },
  dangerButton: {
    borderColor: "red",
    backgroundColor: "red"
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
    width: '60%',
    marginTop: 5,
  },
  name2: {
    fontSize: 16,
    width: '20%',
    marginTop: 5,
  },
});
