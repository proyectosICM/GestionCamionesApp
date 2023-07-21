import React from "react";
import { FlatList } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card, ListItem } from "react-native-elements";

export function Tabla({ titulo, datos }) {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>{titulo}</Card.Title>
        <Card.Divider />
        <View style={styles.user}>
        <Text style={styles.name}>asd</Text>
        <Text style={styles.name2}>Marque</Text>
        <Text style={styles.name2}>Estado</Text>
        </View>
 

        {datos.map((u, i) => {
          return (
            <View key={i} style={styles.user}>
              <Text style={styles.name}>{u}</Text>
              <Button
                title="v"
                type="outline"
                buttonStyle={styles.successButton}
                titleStyle={styles.buttonTitle}
              />
              <Button
                title="x"
                type="outline"
                buttonStyle={styles.successButton}
                titleStyle={styles.buttonTitle}
              />
              <Text>Sin estado</Text>
            </View>
          );
        })}
      </Card>
    </View>
  );
}

// Resto del código se mantiene igual

const styles = StyleSheet.create({
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
  },
  dangerButton: {
    borderColor: "red",
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
