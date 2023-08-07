import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { useEffect } from "react";
import { styles } from "../../Styles/General";
import { Button } from "react-native-elements";
import { base, baseURL } from "../../API/apiurl";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

export default function CamionDetalle({ navigation }) {
  const [camion, setCamion] = useState();
  const [rol, setRol] = useState();
  const [camionid, setCamionid] = useState();
  const route = useRoute();
  const tc = route.params.tc;

  const datosAsync = useCallback(async () => {
    const rolv = await AsyncStorage.getItem("rol");
    const camionidv = await AsyncStorage.getItem("camionid");
    setRol(rolv);
    setCamionid(camionidv);
  }, []);

  useEffect(() => {
    datosAsync();
  }, [datosAsync]);

  const ListarCamion = useListarElementos(
    `${baseURL}camiones/${camionid}`,
    setCamion
  );

  useEffect(() => {
    ListarCamion();
  }, [ListarCamion]);

  const handleAlerta = () => {
    alert("ED")
  }

  const handleListChecklist = () => {
    if(tc == "Camion"){
      navigation.navigate("CheckList Camion", {tc: tc});
    } else if( tc == "Carreta"){
      navigation.navigate("CheckList Carreta", {tc: tc});
    }

  };



  return (
    <View style={styles.container}>
      {camion ? (
        <>
        
          <Text style={styles.tittleText}>{camion.tiposCModel.nombre}</Text>
          <Text style={styles.tittleText}>Placa {camion.placa}</Text>
          <Text style={styles.tittleText}>
            Marca {camion.marcasModel.nombre}
          </Text>
          <Text style={styles.tittleText}>
            Modelo {camion.modeloModel.nombre}
          </Text>
          {rol && rol === "CONDUCTOR" && (
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
              onPress={() => handleListChecklist()}
            />
          )}

          {rol && rol === "MECANICO" && (
            <>
              <Button
                title=" Ver Checklist mas reciente "
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
                onPress={() => handleAlerta()}
              />

              <Button
                title=" Realizar Checklist mas reciente "
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
                onPress={() => handleListChecklist()}
              />
            </>
          )}
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
