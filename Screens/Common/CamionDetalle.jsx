import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { useEffect } from "react";
import { styles } from "../../Styles/General";
import { Button } from "react-native-elements";

export default function CamionDetalle({ navigation }) {
  const [camion, setCamion] = useState();
  const ListarCamion = useListarElementos(
    `http://192.168.1.35:8080/api/camiones/1`,
    setCamion
  );

  useEffect(() => {
    ListarCamion();
  }, [ListarCamion]);

  return (
    <View style={styles.container}>
      {camion ? (
        <>
          <Text style={styles.tittleText}>Placa {camion.placa}</Text>
          <Text style={styles.tittleText}>
            Marca {camion.marcasModel.nombre}
          </Text>
          <Text style={styles.tittleText}>
            Modelo {camion.modeloModel.nombre}
          </Text>
          <TouchableOpacity
            style={styles.styleButton}
            onPress={() => console.log("Realizar checklist")}
          >
            <Text
              style={styles.textoButton}
              onPress={() => navigation.navigate("CheckList")}
            >
              Realizar checklist
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.tittleText}>Cargando...</Text>

          <Button
            title=" Realizar Checklist "
            type="outline"
            buttonStyle={styles.styleButton}
            titleStyle={styles.textoButton}
            icon={{
              name: "check",
              type: "font-awesome",
              size: 25,
              color: "white",
            }}
            iconRight
            onPress={() => navigation.navigate("CheckList")}
          />
        </>
      )}
    </View>
  );
}
