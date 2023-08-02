import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";

export function BotonesCamionAsignado({datos}) {
  const navigation = useNavigation();
  return (
    <>
      <View style={localStyles.buttonRow}>
        <View style={localStyles.buttonContainer}>
          <Button
            title={"Informacion detallada del camion"}
            titleStyle={localStyles.buttonText}
            buttonStyle={localStyles.button}
            onPress={() => navigation.navigate('InfoDetallada', {datos: datos}) }
            icon={<Icon name="info" size={20} color="white" />} // Agrega el icono al botón
          />

          <Button
            title={"Registrar cambio de llantas"}
            titleStyle={localStyles.buttonText}
            buttonStyle={localStyles.button}
            icon={<Icon name="edit" size={20} color="white" />}
            onPress={() => navigation.navigate('Cambio de llantas') } 
          />
        </View>

        <View style={localStyles.buttonContainer}>
          <Button
            title={"Notificaciones"}
            titleStyle={localStyles.buttonText}
            buttonStyle={localStyles.button}
            icon={<Icon name="notifications" size={20} color="white" />}
            onPress={() => navigation.navigate('Notificaciones-Conductor') } 
          />

          <Button
            title={"Observaciones"}
            titleStyle={localStyles.buttonText}
            buttonStyle={localStyles.button}
            icon={<Icon name="comment" size={20} color="white" />} 
            onPress={() => navigation.navigate('Observaciones') } 
          />
        </View>
      </View>

      <View style={localStyles.buttonRow}>
        <View style={localStyles.buttonContainer}>
          <Button
            title={"Eliminar el camion asignado"}
            titleStyle={localStyles.buttonText}
            buttonStyle={localStyles.button}
            icon={<Icon name="delete" size={20} color="white" />} // Agrega el icono al botón
          />
        </View>
      </View>
    </>
  );
}

const localStyles = StyleSheet.create({
  // ... otros estilos

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: 120,
    height: 200,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    flexDirection: "column",
    borderRadius: 8,
    padding: 10,
    width: 120,
    height: 90,
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    marginTop: 8,
    fontSize: 18,
  },
});
