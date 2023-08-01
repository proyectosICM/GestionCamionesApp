import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { styles } from "../../../Styles/General";
import { PanelCDetalle } from "./PanelCDetalle";
import { ScrollView } from "react-native";

export function InfoDetallada() {
  return (
    <View style={styles.container}> 
      <PanelCDetalle tipoc="Camion" />
      <PanelCDetalle tipoc="Carreta" />
    </View>
  );
}
