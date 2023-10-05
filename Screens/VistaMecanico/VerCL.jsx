import React from "react";
import { Alert, View } from "react-native";
import { Text } from "react-native";
import { styles } from "../../Styles/General";
import { Button, Card } from "react-native-elements";
import { useState } from "react";
import {
  RGS_CHabilitar,
  RGS_CPendiente,
  RGS_CReparar,
  RGS_URL,
} from "../../API/apiurl";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { useEffect } from "react";
import { useListarElementos } from "../../Hooks/CRUDHook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkListCamionURL } from "./../../API/apiurl";
import { tablesCam, tablesCarr } from "../../API/datosCLConductor";
import { servicioExpress } from "./../../API/datosCLMecanico";
// import { CLExcel, mensaje } from "../Common/ExcelCL";
import axios from "axios";
import { StyleSheet } from "react-native";
import { MenuCamiones } from "../Common/MenuCamiones";

export function VerCL() {
  const [camion, setCamion] = useState([]);
  const [rol, setRol] = useState();
  const [camionid, setCamionid] = useState();
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.id;

  const datosAsync = useCallback(async () => {
    const rolv = await AsyncStorage.getItem("rol");
    const camionidv = await AsyncStorage.getItem("camionid");
    setRol(rolv);
    setCamionid(camionidv);
  }, []);

  useEffect(() => {
    datosAsync();
  }, [datosAsync]);

  const ListarCamion = useListarElementos(`${RGS_URL}/${id}`, setCamion);

  useEffect(() => {
    ListarCamion();
  }, [ListarCamion]);

  const handleGo = async (op, datos) => {
    if (op === "Camion" && camion.checkListCamionModel) {
      navigation.navigate("Ver Datos", {
        datos: camion.checkListCamionModel,
        tc: "Camion",
        rol: rol,
        tablesD: datos,
      });
    } else if (op === "Carreta" && camion.checkListCarretaModel) {
      navigation.navigate("Ver Datos", {
        datos: camion.checkListCarretaModel,
        tc: "Carreta",
        rol: rol,
        tablesD: datos,
      });
    } else if (op === "Expreso" && camion.checkListExpresoModel) {
      navigation.navigate("Ver Datos", {
        datos: camion.checkListExpresoModel,
        tc: "Camion",
        rol: rol,
        tablesD: datos,
      });
    } else if (op === "Pendiente") {
      const token = await AsyncStorage.getItem("token");
      const empresa = await AsyncStorage.getItem("empresa");
      const sede = await AsyncStorage.getItem("sede");
      console.log(`${RGS_CPendiente}${id}`);
      console.log(token);
      await axios
        .put(`${RGS_CPendiente}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(console.log("no"));
      console.log(id, " ds");
    } else if (op === "cEstado") {
      const token = await AsyncStorage.getItem("token");
      const empresa = await AsyncStorage.getItem("empresa");
      const sede = await AsyncStorage.getItem("sede");
      console.log(`${RGS_CPendiente}${id}`);
      console.log(token);

      if (datos.estado == true && datos.reparacion == false) {
        Alert.alert(
          "Seguro de colocar como pendiente el camion y carreta?",
          "Esta acción no se puede deshacer.",
          [
            {
              text: "No",
              onPress: () => {
                // Acción a realizar si el usuario selecciona "No"
                console.log("El usuario seleccionó No");
              },
              style: "cancel", // Opcional: estilo "cancel" para el botón "No"
            },
            {
              text: "Sí",
              onPress: async () => {
                try {
                  await axios.put(
                    `${RGS_CPendiente}${id}`,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  navigation.navigate("Menu-Camion", {
                    menucam: "habilitados",
                  });
                } catch (error) {
                  console.error("Error al realizar la solicitud PUT:", error);
                }
                // Aquí puedes poner tu lógica para enviar el registro a reparar
              },
            },
          ]
        );
      } else if (datos.estado == false && datos.reparacion == false) {
        Alert.alert(
          "Pasar camión a reparar",
          "¿Estás seguro de que quieres enviar el camión a reparación?",
          [
            {
              text: "Sí",
              onPress: async () => {
                try {
                  await axios.put(`${RGS_CReparar}${id}`, {}, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  console.log("Camión enviado a reparación");
                  navigation.navigate("Menu-Camion", {
                    menucam: "pendientes",
                  });
                } catch (error) {
                  console.error("Error al realizar la solicitud PUT:", error);
                }
              },
            },
            {
              text: "No",
              style: "cancel",
            },
          ]
        );
      } else if (datos.estado == false && datos.reparacion == true) {
        Alert.alert(
          "Seguro de retirar registro de reparación y habilitar el camión y carreta?",
          "¿Estás seguro de que quieres realizar esta acción?",
          [
            {
              text: "Sí",
              onPress: async () => {
                try {
                  await axios.put(`${RGS_CHabilitar}${id}`, {}, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  navigation.navigate("Menu-Camion", {
                    menucam: "reparar",
                  });
                  console.log("Registro de reparación retirado y camión habilitado");
                } catch (error) {
                  console.error("Error al realizar la solicitud PUT:", error);
                }
              },
            },
            {
              text: "No",
              style: "cancel",
            },
          ]
        );
      }
    }
  };

  console.log(camion.estado);
  return (
    <View style={styles.container}>
      <View style={localStyles.cardContainer}>
        <View style={localStyles.cardItem}>
          <Card style={{ height: "100%" }}>
            <Card.Title>
              {camion.checkListCamionModel
                ? "Ver CheckList Camion"
                : "No hay checklist de camion registrado"}
            </Card.Title>
            <Text style={{ textAlign: "center" }}>
              Ver el checklist realizado para el camion{" "}
              {camion.checkListCamionModel &&
                camion.checkListCamionModel.camionesModel.placa}
            </Text>
            <Button
              title={
                camion.checkListCamionModel
                  ? "Ver"
                  : "No hay checklist de camion registrado"
              }
              buttonStyle={[
                styles.styleButton,
                { alignContent: "center", justifyContent: "center" },
              ]}
              titleStyle={[styles.textoButton, { textAlign: "center" }]}
              onPress={() => handleGo("Camion", tablesCam)}
            />
          </Card>
        </View>

        <View style={localStyles.cardItem}>
          <Card style={{ height: "100%" }}>
            <Card.Title>
              {camion.checkListCarretaModel
                ? "Ver CheckList Carreta"
                : "No hay checklist de carreta registrados"}
            </Card.Title>
            <Text style={{ textAlign: "center" }}>
              Ver el checklist realizado para el camion{" "}
              {camion.checkListCarretaModel &&
                camion.checkListCarretaModel.camionesModel.placa}
            </Text>
            <Button
              title={
                camion.checkListCamionModel
                  ? "Ver"
                  : "No hay checklist de camion registrado"
              }
              buttonStyle={[
                styles.styleButton,
                { alignContent: "center", justifyContent: "center" },
              ]}
              titleStyle={[styles.textoButton, { textAlign: "center" }]}
              onPress={() => handleGo("Carreta", tablesCarr)}
            />
          </Card>
        </View>
      </View>

      <View style={localStyles.cardContainer}>
        <View style={localStyles.cardItem}>
          <Card style={{ height: "100%" }}>
            <Card.Title>
              {camion.checkListExpresoModel
                ? "Ver CheckList Servicio Expreso"
                : "No hay checklist express registrados"}
            </Card.Title>
            <Text style={{ textAlign: "center" }}>
              Ver el checklist expreso realizado
            </Text>
            <Button
              title={
                camion.checkListExpresoModel
                  ? "Ver"
                  : "No hay checklist express registrados"
              }
              buttonStyle={[
                styles.styleButton,
                { alignContent: "center", justifyContent: "center" },
              ]}
              titleStyle={[styles.textoButton, { textAlign: "center" }]}
              onPress={() => handleGo("Expreso", servicioExpress)}
            />
          </Card>
        </View>

        <View style={localStyles.cardItem}>
          <Card style={{ height: "100%" }}>
            <Card.Title>Ver Imagenes de falla</Card.Title>
            <Text style={{ textAlign: "center" }}>
              Ver la fotos de fallas adjuntadas
            </Text>
            <Button
              title={"Ver"}
              buttonStyle={[
                styles.styleButton,
                { alignContent: "center", justifyContent: "center" },
              ]}
              titleStyle={[styles.textoButton, { textAlign: "center" }]}
              onPress={() =>
                navigation.navigate("Galeria", { idRgs: camion.id })
              }
            />
          </Card>
        </View>
      </View>
      {camion && camion.estado && !camion.reparacion && (
        <Button
          title={"Colocar camion como pendiente a reparacion"}
          buttonStyle={[
            styles.styleButton,
            { width: "80%", backgroundColor: "blue", margin: "10%" },
          ]}
          titleStyle={[
            styles.textoButton,
            { textAlign: "center", paddingHorizontal: "10%" },
          ]}
          onPress={() => handleGo("cEstado", camion)}
        />
      )}

      {camion && !camion.estado && !camion.reparacion && (
        <Button
          title={"Empezar la reparacion"}
          buttonStyle={[
            styles.styleButton,
            { width: "80%", backgroundColor: "blue", margin: "10%" },
          ]}
          titleStyle={[
            styles.textoButton,
            { textAlign: "center", paddingHorizontal: "10%" },
          ]}
          onPress={() => handleGo("cEstado", camion)}
        />
      )}

      {camion && !camion.estado && camion.reparacion && (
        <>
          <Button
            title={"Agregar Reparacion"}
            buttonStyle={[
              styles.styleButton,
              { backgroundColor: "blue", margin: "4%" },
            ]}
            titleStyle={[
              styles.textoButton,
              { textAlign: "center", paddingHorizontal: "10%" },
            ]}
            onPress={() =>
              navigation.navigate("Agregar Reparacion", { rgs: id })
            }
          />

          <Button
            title={"Habilitar camion y carreta"}
            buttonStyle={[
              styles.styleButton,
              { backgroundColor: "blue", margin: "4%" },
            ]}
            titleStyle={[
              styles.textoButton,
              { textAlign: "center", paddingHorizontal: "10%" },
            ]}
            onPress={() => handleGo("cEstado", camion)}
          />
        </>
      )}

      <Button
        title={"Ver Reparacioes realizadas"}
        buttonStyle={[
          styles.styleButton,
          { backgroundColor: "blue", margin: "4%" },
        ]}
        titleStyle={[
          styles.textoButton,
          { textAlign: "center", paddingHorizontal: "10%" },
        ]}
        onPress={() => navigation.navigate("Historial de Reparacion", { rgsm: id })}
      />

      {/*
      <Button
        title={"Descargar un archivo excel"}
        buttonStyle={[styles.styleButton, { width: "80%", backgroundColor: "green" }]}
        titleStyle={[styles.textoButton, { textAlign: "center", paddingHorizontal: "10%" }]}
        onPress={() => Alert.alert("No disponible aun", "Esta funcion solo esta disponible desde el sistema web, aun no disponible en movil")}
      />
      */}
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "row", // Esto coloca los Cards en la misma línea
    justifyContent: "space-between", // Esto separa los Cards horizontalmente
    width: "90%",
    /*
    borderColor: "blue",
    borderWidth: 2,
    */
  },
  cardItem: {
    alignItems: "center",
    textAlign: "center",
    width: "50%",
    maxHeight: "90%",
  },
});
