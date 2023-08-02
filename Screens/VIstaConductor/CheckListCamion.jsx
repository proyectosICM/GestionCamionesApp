import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "react-native-elements";
import { useState, useEffect } from "react"; // Importamos useEffect
import { Tabla } from "../Common/Tabla";
import { styles } from "../../Styles/General";
import { CustomBottomTabBar } from "../../CustomBottomTabBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CheckDatos } from "./CheckDatos";

import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tablesCam } from "../../API/datosCLConductor";

export default function CheckListCamion() {
  const tables = tablesCam
  const [camion, setCamion] = useState();
  const [rol, setRol] = useState();
  const [camionid, setCamionid] = useState();
  const [usuario, setUsuario] = useState();

  const route = useRoute();
  const tc = route.params.tc;

  const datosAsync = useCallback(async () => {
    const rolv = await AsyncStorage.getItem("rol");
    const camionidv = await AsyncStorage.getItem("camionid");
    const usuariov = await AsyncStorage.getItem("usuario");
    setRol(rolv);
    setCamionid(camionidv);
    setUsuario(usuariov);
  }, []);

  useEffect(() => {
    datosAsync();
  }, [datosAsync]);

  const [currentTable, setCurrentTable] = useState(0);
  const [marcar, setMarcar] = useState(() =>
    tables.map((table) => Array(table.datos.length).fill(null))
  );

  const navigate = useNavigation();

  const allTablesMarked = () => {
    return marcar.every((table) => allItemsMarked(table));
  };

  const handleBack = () => {
    if (currentTable > 0) {
      setCurrentTable(currentTable - 1);
    }
  };

  const allItemsMarked = (marcarArr) => {
    return marcarArr.every((item) => item !== null);
  };

  const handleNext = () => {
    if (
      currentTable < tables.length - 1 &&
      allItemsMarked(marcar[currentTable])
    ) {
      setCurrentTable(currentTable + 1);
    }
  };

  const handleEnviar = () => {
    navigate.navigate("CheckDatos", { datos: marcar, tiempo: tiempo, tc: tc }); // Envía los datos de 'marcar' a la pantalla CheckDatosScreen
  };

  // Agregamos un estado para el temporizador y una función para actualizarlo
  const [tiempo, setTiempo] = useState(0);
  const actualizarTiempo = () => {
    setTiempo((prevTiempo) => prevTiempo + 1);
  };

  // Usamos useEffect para iniciar el temporizador al renderizar el componente
  useEffect(() => {
    const interval = setInterval(actualizarTiempo, 1000); // Temporizador actualizado cada 1 segundo

    return () => clearInterval(interval); // Limpiamos el intervalo cuando el componente se desmonte
  }, []);

  return (
    <View style={styles.container}>
      <Text>Tiempo: {tiempo} segundos</Text>
      <Text style={styles.tittleText}>CheckList</Text>
      <Tabla
        titulo={tables[currentTable].titulo}
        datos={tables[currentTable].datos}
        marcar={marcar[currentTable]}
        setMarcar={(estado) => {
          const newMarcar = [...marcar];
          newMarcar[currentTable] = estado;
          setMarcar(newMarcar);
        }}
      />
      <Button
        title="Atras"
        type="outline"
        onPress={handleBack}
        buttonStyle={{ backgroundColor: "#ccc", width: 150 }}
        titleStyle={{ color: "black" }}
        disabled={currentTable === 0}
      >
        Anterior
      </Button>
      <Button
        title="Siguiente"
        type="outline"
        onPress={handleNext}
        buttonStyle={{ backgroundColor: "white", width: 150 }}
        disabled={
          currentTable === tables.length - 1 ||
          !allItemsMarked(marcar[currentTable])
        }
      >
        Siguiente
      </Button>
      {currentTable === tables.length - 1 && allTablesMarked() && (
        <Button
          title="Enviar datos"
          type="solid"
          buttonStyle={{ backgroundColor: "blue", width: 200, marginTop: 20 }}
          titleStyle={{ color: "white" }}
          onPress={() => handleEnviar()}
        />
      )}
    </View>
  );
}
