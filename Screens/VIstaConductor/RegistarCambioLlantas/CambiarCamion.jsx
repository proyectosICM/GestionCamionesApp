import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-elements";
import { styles } from "../../../Styles/General";

export function CambiarCamion() {
  return (
    <>
      <Text style={styles.tittleText}>Camion</Text>
      <View style={localStyles.buttonRow}>
        <Button title={"1"} buttonStyle={localStyles.button} />
        <View style={localStyles.buttonSeparator} />
        <Button title={"2"} buttonStyle={localStyles.button} />
      </View>

      <View style={localStyles.buttonRow}>
        <Button title={"3"} buttonStyle={localStyles.button} />
        <Button title={"4"} buttonStyle={localStyles.button} />

        <View style={localStyles.buttonSeparator} />

        <Button title={"5"} buttonStyle={localStyles.button} />
        <Button title={"6"} buttonStyle={localStyles.button} />
      </View>

      <View style={localStyles.buttonRow}>
        <Button title={"7"} buttonStyle={localStyles.button} />
        <Button title={"8"} buttonStyle={localStyles.button} />

        <View style={localStyles.buttonSeparator} />

        <Button title={"9"} buttonStyle={localStyles.button} />
        <Button title={"10"} buttonStyle={localStyles.button} />
      </View>
      <Button title={"RP"} buttonStyle={localStyles.button} />
    </>
  );
}

const localStyles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 80,
    padding: 10,
    width: 50,
  },
  buttonSeparator: {
    width: 20,
  },
});
