import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { styles } from "../../Styles/General";
import { ItemCamion } from "./MenuCamiones/ItemCamion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { camionesxreparacion, camionesxsede } from "../../API/apiurl";

export function MenuCamiones() {
  const [camiones, setCamiones] = useState([]);
  const [sede, setSede] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [url, setUrl] = useState(null);
  const [titulo, setTitulo] = useState(null);
  const [op , setOp] = useState("");

  const datosAsync = useCallback(async () => {
    const sedev = await AsyncStorage.getItem("sede");
    const empresav = await AsyncStorage.getItem("empresa");
    const menucam = await AsyncStorage.getItem("menucam");
    setSede(sedev);
    setEmpresa(empresav);
    if (menucam === "habilitados") {
      setUrl(`${camionesxsede}${empresav}/${sedev}/1`);
      setTitulo("Camiones Habilitados (En buen estado)");
      setOp('Habilitados')
    } else if (menucam === "deshabilitados") {
      setUrl(`${camionesxsede}${empresav}/${sedev}/0`);
      setTitulo("Camiones Deshabilitados (En mal estado)");
      setOp('Deshabilitados')
    } else if (menucam === "pendiente") {
      setUrl(`${camionesxreparacion}${empresav}/${sedev}/0/0`);
      setTitulo("Camiones Pendientes a reparacion"); 
      setOp('Pendiente')
    } else if (menucam === "enreparacion") {
      setUrl(`${camionesxreparacion}${empresav}/${sedev}/0/1`);
      setTitulo("Camiones en reparacion"); 
      setOp('enreparacion')
    }else {
      setUrl(null); 
      setTitulo(null); 
    }
  }, []);

  useEffect(() => {
    datosAsync();
  }, [datosAsync]);

  const ListarCamiones = useListarElementos(url, setCamiones);

  useEffect(() => {
    if (empresa && sede && url) {
      // Verificar que empresa, sede y url sean válidos antes de llamar a ListarCamiones
      ListarCamiones();
    }
  }, [empresa, sede, url, ListarCamiones]);

  const renderItem = ({ item }) => (
    <ItemCamion
      title={item.placa}
      description={item.tiposCModel.nombre}
      estado={item.estado}
      enreparacion={item.enreparacion}
      op = {op}
    />
  );
 
  return (
    <View>
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
    </View>
  );
}
