import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { useEffect } from "react";

export default function CamionDetalle({ navigation }) {
  const [camion, setCamion] = useState();
  const ListarCamion = useListarElementos(
    `http://192.168.1.232:8080/api/camiones/1`,
    setCamion
  );

  useEffect(() => {
    ListarCamion();
  }, [ListarCamion]);

  return (
    <View style={styles.container}>
      {camion ? (
        <>
          <Text style={styles.placaText}>Placa {camion.placa}</Text>
          <Text style={styles.placaText}>Marca {camion.marcasModel.nombre}</Text>
          <Text style={styles.placaText}>Modelo {camion.modeloModel.nombre}</Text>
          <TouchableOpacity
            style={styles.checklistButton}
            onPress={() => console.log("Realizar checklist")}
          >
            <Text
              style={styles.checklistButtonText}
              onPress={() => navigation.navigate("CheckList")}
            >
              Realizar checklist
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  placaText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  marcaText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modeloText: {
    fontSize: 18,
    marginBottom: 20,
  },
  checklistButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checklistButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
