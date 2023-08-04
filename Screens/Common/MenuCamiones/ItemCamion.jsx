import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-elements";
import { FontAwesome } from "react-native-vector-icons/FontAwesome";

export function ItemCamion({ title, description, estado, op }) {
  const navigation = useNavigation();
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={{ textAlign: "center" }}>{description}</Text>
      {estado ? (
        <View style={{ alignItems: "center" }}>
          <FontAwesome5 name="check" color="green" size={20} />
          <Text></Text>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <FontAwesome5 name="times" color="red" size={20} />
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { margin: 2, width: "100%" }]}
        onPress={() => navigation.navigate("Detalles")}
      >
        <Text style={styles.buttonText}>Detalles </Text>
      </TouchableOpacity>

      {op === "Pendiente" && (
        <Button
          title={"Solicitar Reparacion"}
          icon={
            <Icon
              name="wrench" // Aquí puedes cambiar el nombre del icono según el icono que desees usar
              type="font-awesome" // Puedes cambiar el tipo de icono según la librería de iconos que estés utilizando
              color="white" // Puedes cambiar el color del icono
              size={24} // Puedes cambiar el tamaño del icono
            />
          }
          buttonStyle={[styles.button, { margin: 2, width: "100%" }]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 2, // Para sombra en Android
    shadowColor: "#000", // Para sombra en iOS
    shadowOffset: { width: 0, height: 2 }, // Para sombra en iOS
    shadowOpacity: 0.2, // Para sombra en iOS
    shadowRadius: 4, // Para sombra en iOS
    width: 160,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
