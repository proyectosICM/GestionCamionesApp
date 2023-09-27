import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
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
import { VerCL } from "../VistaMecanico/VerCL";
import { servicioExpress } from "../../API/datosCLMecanico";
import VerificacionCarreta from "../VIstaConductor/VerificarCarreta";

export default function CamionDetalle({ navigation }) {
  const [camion, setCamion] = useState();
  const [rol, setRol] = useState();
  //const [camionid, setCamionid] = useState();
  const route = useRoute();
  const tc = route.params.tc;
  const camionid = route.params.camionid;

  const datosAsync = useCallback(async () => {
    const rolv = await AsyncStorage.getItem("rol");
    const camionidv = await AsyncStorage.getItem("camionid");
    setRol(rolv);
    //setCamionid(camionidv);
  }, []);

  useEffect(() => {
    datosAsync();
  }, [datosAsync]);

  const ListarCL = useListarElementos(`${baseURL}RGS/${camionid}`, setCamion);

  const ListarCamion = useListarElementos(`${baseURL}camiones/${camionid}`, setCamion);

  useEffect(() => {
    if (rol == "CONDUCTOR") {
      ListarCamion();
      console.log("Cond");
      console.log(camion);
    } else if (rol == "MECANICO") {
      ListarCL();
      console.log("sadsad");
    }
  }, [rol]);

  const handleAlerta = () => {
    alert("ED");
  };

  const handleListChecklist = () => {
    if (rol == "CONDUCTOR") {
      if (camion.tiposCModel.id == 1) {
        navigation.navigate("CheckList Camion", { tc: tc, tablesD: tablesCam });
      } else if (camion.tiposCModel.id == 2) {
        navigation.navigate("CheckList Camion", {
          tc: tc,
          tablesD: tablesCarr,
        });
      }
    } else if (rol == "MECANICO") {
      navigation.navigate("CheckList Camion", {
        tc: tc,
        tablesD: servicioExpress,
      });
    }
  };

  const handleGo = (op, datos) => {
    if (op === "Camion") {
      navigation.navigate("Ver Datos", {
        datos: camion?.checkListCamionModel,
        tc: "Camion",
        rol: rol,
        tablesD: datos,
      });
    } else if (op === "Carreta") {
      navigation.navigate("Ver Datos", {
        datos: camion?.checkListCarretaModel,
        tc: "Carreta",
        rol: rol,
        tablesD: datos,
      });
    } else if (op === "Expreso") {
      navigation.navigate("Ver Datos", {
        datos: camion?.checkListCamionModel,
        tc: "Camion",
        rol: rol,
        tablesD: datos,
      });
    }
  };

  return (
    <ImageBackground source={fondo} style={styles.backgroundImage}>
      <View style={styles.container}>
        {camion && rol == "CONDUCTOR" && camion.tiposCModel ? (
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 15,
              alignItems: "center",
              width: 300,
            }}
          >
            <Text style={styles.tittleText}>{camion.tiposCModel?.nombre}</Text>
            <Text style={styles.tittleText}>Placa {camion.placa}</Text>
            <Text style={styles.tittleText}>Marca {camion.marcasModel?.nombre}</Text>
            <Text style={styles.tittleText}>Modelo {camion.modeloModel?.nombre}</Text>

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
          </View>
        ) : (
          <>
            {rol && rol  === "CONDUCTOR" &&  (
              <View>
                <Text style={[styles.tittleText, { textAlign: "center" }]}>Cargando...</Text>
                <Text style={[styles.tittleText, { textAlign: "center" }]}>
                  Si no es redirigido luego de 5 segundos posiblemente el QR escaneado no pertenece a un camion
               
                </Text>
                <Button
                  title=" Escanear QR nuevamente "
                  type="outline"
                  buttonStyle={styles.styleButton}
                  titleStyle={styles.textoButton}
                  /*icon={<FontAwesome name="camera" size={20}  color="red" />}*/
                  icon={{
                    name: "camera",
                    type: "font-awesome",
                    size: 25,
                    color: "white",
                  }}
                  iconRight
                  onPress={() => navigation.navigate(VerificacionCarreta)}
                />
              </View>
            )}
          </>
        )}
        <View style={{ margin: 20 }}>
          {rol && rol === "MECANICO" && (
            <>
              <Button
                title=" Ver Checklist de Camion "
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
                onPress={() => handleGo("Camion", tablesCam)}
              />

              <Button
                title=" Ver Checklist de Carreta "
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
                onPress={() => handleGo("Carreta", tablesCarr)}
              />

              {camion?.checkListExpresoModel ? (
                <>
                  <Button
                    title={"Ver CheckList Servicio Expreso"}
                    buttonStyle={styles.styleButton}
                    titleStyle={styles.textoButton}
                    onPress={() => handleGo("Expreso", servicioExpress)}
                  />

                  <Button
                    title=" Autorizar salida "
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

                  <Button
                    title=" Solicitar ingreso a reparacion  "
                    type="outline"
                    buttonStyle={styles.styleButton}
                    titleStyle={styles.textoButton}
                    icon={{
                      name: "wrench",
                      type: "font-awesome",
                      size: 25,
                      color: "white",
                    }}
                    iconRight
                    onPress={() => handleListChecklist()}
                  />
                </>
              ) : (
                <Button
                  title=" Realizar Checklist Express "
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
            </>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
