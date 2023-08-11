import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { useEffect } from "react";
import { styles } from "../../Styles/General";
import { Button, Card } from "react-native-elements";
import { base, baseURL } from "../../API/apiurl";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { tablesCam, tablesCarr } from "../../API/datosCLConductor";
import { fondo } from "../../Styles/PaletaColores";

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
    alert("ED");
  };

  const handleListChecklist = () => {
    if (tc == "Camion") {
      navigation.navigate("CheckList Camion", { tc: tc, tablesD: tablesCam });
    } else if (tc == "Carreta") {
      navigation.navigate("CheckList Camion", { tc: tc, tablesD: tablesCarr });
    }
  };

  return (
    <ImageBackground source={fondo} style={styles.backgroundImage}>
      <View style={styles.container}>
        {camion ? (
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 15,
              alignItems: "center",
              width: 200
            }}
          >
            <Text style={styles.tittleText}>{camion.tiposCModel.nombre}</Text>
            <Text style={styles.tittleText}>Placa {camion.placa}</Text>
            <Text style={styles.tittleText}>
              Marca {camion.marcasModel.nombre}
            </Text>
            <Text style={styles.tittleText}>
              Modelo {camion.modeloModel.nombre}
            </Text>
          </View>
        ) : (
          <>
          
            <Text style={styles.tittleText}>Cargando...</Text>
          </>
        )}
        <View style={{margin: 20}}>
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
        </View>
      </View>
    </ImageBackground>
  );
}
