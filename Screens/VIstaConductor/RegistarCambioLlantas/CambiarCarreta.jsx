import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { styles } from "../../../Styles/General";

export function CambiarCarreta() {
  return (
    <>
      <Text style={styles.tittleText}>Carreta</Text>


      <View style={localStyles.buttonRow}>
        <Button title={"15"} buttonStyle={localStyles.button} />
        <Button title={"16"} buttonStyle={localStyles.button} />

        <View style={localStyles.buttonSeparator} />

        <Button title={"17"} buttonStyle={localStyles.button} />
        <Button title={"18"} buttonStyle={localStyles.button} />
      </View>

      <View style={localStyles.buttonRow}>
        <Button title={"19"} buttonStyle={localStyles.button} />
        <Button title={"20"} buttonStyle={localStyles.button} />

        <View style={localStyles.buttonSeparator} />

        <Button title={"21"} buttonStyle={localStyles.button} />
        <Button title={"22"} buttonStyle={localStyles.button} />
      </View>

      <View style={localStyles.buttonRow}>
        <Button title={"23"} buttonStyle={localStyles.button} />
        <Button title={"24"} buttonStyle={localStyles.button} />

        <View style={localStyles.buttonSeparator} />

        <Button title={"25"} buttonStyle={localStyles.button} />
        <Button title={"26"} buttonStyle={localStyles.button} />
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
