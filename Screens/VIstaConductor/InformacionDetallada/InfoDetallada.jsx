import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { styles } from "../../../Styles/General";
import { PanelCDetalle } from "./PanelCDetalle";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

export function InfoDetallada() {
  const route = useRoute();
  const datos = route.params.datos;

  return (
    <View style={styles.container}>
      <PanelCDetalle
        tipoc={datos.camionesModel.tiposCModel.nombre}
        placa={datos.camionesModel.placa}
        marca={datos.camionesModel.marcasModel.nombre}
        modelo={datos.camionesModel.modeloModel.nombre}
      />
      <PanelCDetalle
        tipoc={datos.carreta.tiposCModel.nombre}
        placa={datos.carreta.placa}
        marca={datos.carreta.marcasModel.nombre}
        modelo={datos.carreta.modeloModel.nombre}
      />
    </View>
  );
}
