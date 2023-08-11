import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { styles } from "../../../Styles/General";
import { PanelCDetalle } from "./PanelCDetalle";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { fondo } from "../../../Styles/PaletaColores";

export function InfoDetallada() {
  const route = useRoute();
  const datos = route.params.datos;

  return (
    <ImageBackground source={fondo}  style={styles.backgroundImage}>
    <View style={styles.container}>
      <PanelCDetalle
        tipoc={datos.rgsModel.checkListCamionModel.camionesModel.tiposCModel.nombre}
        placa={datos.rgsModel.checkListCamionModel.camionesModel.placa}
        marca={datos.rgsModel.checkListCamionModel.camionesModel.marcasModel.nombre}
        modelo={datos.rgsModel.checkListCamionModel.camionesModel.modeloModel.nombre}
      />
      <PanelCDetalle
        tipoc={datos.rgsModel.checkListCarretaModel.camionesModel.tiposCModel.nombre}
        placa={datos.rgsModel.checkListCarretaModel.camionesModel.placa}
        marca={datos.rgsModel.checkListCarretaModel.camionesModel.marcasModel.nombre}
        modelo={datos.rgsModel.checkListCarretaModel.camionesModel.modeloModel.nombre}
      />
    </View>
    </ImageBackground>
  );
}
