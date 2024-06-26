import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { styles } from "../../Styles/General";
import { ItemCamion } from "./MenuCamiones/ItemCamion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useListarElementos } from "../../Hooks/CRUDHook";
import {
  RGS_Listados,
  RGS_xEmpresa,
  camionesxreparacion,
  camionesxsede,
} from "../../API/apiurl";
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { fondo } from "../../Styles/PaletaColores";

export function MenuCamiones() {
  const [camiones, setCamiones] = useState([]);
  const [sede, setSede] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [url, setUrl] = useState(null);
  const [titulo, setTitulo] = useState(null);
  const [op, setOp] = useState("");

  const datosAsync = useCallback(async () => {
    const sedev = await AsyncStorage.getItem("sede");
    const empresav = await AsyncStorage.getItem("empresa");
    const menucam = await AsyncStorage.getItem("menucam");
    setSede(sedev);
    setEmpresa(empresav);
    if (menucam === "habilitados") {
      //setUrl(`${camionesxsede}${empresav}/${sedev}/1`);
      setUrl(`${RGS_Listados}${empresav}/${sedev}/1/0`);
      setTitulo("Checklist mas recientes");
      setOp("Habilitados");
      ListarCamiones();
    } else if (menucam === "deshabilitados") {
      setUrl(`${camionesxsede}${empresav}/${sedev}/0/0`);
      setTitulo("Camiones Deshabilitados (En mal estado)");
      setOp("Deshabilitados");
    } else if (menucam === "pendiente") {
      setUrl(`${RGS_Listados}${empresav}/${sedev}/0/0`);
      setTitulo("Camiones Pendientes a reparacion");
      setOp("Pendiente");
      console.log(`${RGS_Listados}${empresav}/${sedev}/0/0`)
    } else if (menucam === "enreparacion") {
      setUrl(`${RGS_Listados}${empresav}/${sedev}/0/1`);
      setTitulo("Camiones en reparacion");
      setOp("enreparacion");
    } else {
      setUrl(null);
      setTitulo(null);
    }
  }, []);

  useEffect(() => {
    datosAsync();
  },[datosAsync]);
  
  const ListarCamiones = useListarElementos(url, setCamiones);

  useEffect(() => {
    const intervalId = setInterval(() => {
      ListarCamiones();
      // Aquí puedes colocar la lógica que deseas que se ejecute cada segundo
    }, 1000); // 1000 milisegundos = 1 segundo

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [ListarCamiones]); 


  useEffect(() => {
    if (empresa && sede && url) {
      // Verificar que empresa, sede y url sean válidos antes de llamar a ListarCamiones
      ListarCamiones();
    }
  }, [empresa, sede, url, ListarCamiones]);

  const renderItem = ({ item }) =>
    op === "Habilitados" ? (
      item ? (
        <ItemCamion
          id={item.id}
          title={item.checkListCamionModel.camionesModel.placa}
          description={
            item.checkListCamionModel.camionesModel.tiposCModel.nombre
          }
          title2={item.checkListCarretaModel && item.checkListCarretaModel.camionesModel.placa}
          description2={
            item.checkListCarretaModel && item.checkListCarretaModel.camionesModel.tiposCModel.nombre
          }
          estado={item.checkListCamionModel.camionesModel.estado}
          enreparacion={item.checkListCamionModel.camionesModel.enreparacion}
          fecha = {item.fechaCreacion}
          op={op}
          item = {item}
          actualizar = {() => ListarCamiones()}
        />
      ) : (
        <Text>Fallado {item.id}</Text>
      )
    ) : (
      <ItemCamion
        id={item.id}
        title={item.checkListCamionModel.camionesModel.placa}
        description={
          item.checkListCamionModel.camionesModel.tiposCModel.nombre
        }
        title2={item.checkListCarretaModel.camionesModel.placa}
        description2={
          item.checkListCarretaModel && item.checkListCarretaModel.camionesModel.tiposCModel.nombre
        }
        estado={item.checkListCamionModel.camionesModel.estado}
        enreparacion={item.checkListCamionModel.camionesModel.enreparacion}
        fecha = {item.fechaCreacion}
        op={op}
        item = {item}
        actualizar = {() => ListarCamiones()}
        /*
        description={item.tiposCModel.nombre}
        estado={item.estado}
        enreparacion={item.enreparacion}
        op={op}
        */
      />
    );

  return (
    <>
      <ImageBackground source={fondo} style={styles.backgroundImage}>
        {titulo && (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.tittleText}>{titulo}</Text>
          </View>
        )}

        <FlatList
          data={camiones}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      </ImageBackground>
    </>
  );
}
