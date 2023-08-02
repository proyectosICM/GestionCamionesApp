import React, { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-elements";
import { styles } from "../../../Styles/General";
import { ScrollView } from "react-native";

export function CambiarCamion() {
  const rows = [
    [1, , 2],
    [[3], 4, [5], 6],
    [[7], 8, [9], 10],
  ];

  const [cambio, setCambio] = useState(false);

  const handleCambiar = (n) => {
    setCambio(true);
  };
  return (
    <ScrollView>
      <Text style={styles.tittleText}>Camion</Text>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={localStyles.buttonRow}>
          {row.map((number) => (
            <React.Fragment key={number}>
              {Array.isArray(number) ? (
                <>
                  {number.map((nestedNumber) => (
                    <React.Fragment key={nestedNumber}>
                      <Button
                        title={String(nestedNumber)}
                        buttonStyle={localStyles.button}
                        onPress={() => handleCambiar(nestedNumber)}
                      />
                      {number.indexOf(nestedNumber) < number.length - 1 && (
                        <View style={localStyles.buttonSeparator} />
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  <Button
                    title={String(number)}
                    onPress={() => handleCambiar(number)}
                    buttonStyle={localStyles.button}
                  />
                  {row.indexOf(number) < row.length - 1 && (
                    <View style={localStyles.buttonSeparator} />
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </View>
      ))}
      <View style={localStyles.buttonSeparator} />
      <Button
        title={"RP"}
        buttonStyle={localStyles.button}
        onPress={() => handleCambiar("RP")}
      />
      <View style={localStyles.buttonSeparator} />
      {cambio && (
        <Text style={[styles.tittleText, { margin: 10 }]}>
          Registro de cambio
        </Text>
      )}
    </ScrollView>
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
