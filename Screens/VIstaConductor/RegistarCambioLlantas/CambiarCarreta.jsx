import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-elements";
import { styles } from "../../../Styles/General";

export function CambiarCarreta() {
  const rows = [[[15], 16, [17], 18], [[19], 20, [21], 22], [[23], 24, [25], 26], ["RP"]];

  const [texto, setTexto] = useState("");
  const [llantaSelect, setLlantaSelect] = useState("")
  const [cambios, setCambios] = useState(
    rows.map((row) => row.map(() => false)) // Inicializamos todos los botones como no seleccionados
  );

  const handleCambiar = (rowIndex, buttonIndex) => {
    const newCambios = cambios.map((row, rIndex) =>
      row.map((button, bIndex) => rIndex === rowIndex && bIndex === buttonIndex)
    );
    setCambios(newCambios);
    setLlantaSelect(String(rows[rowIndex][buttonIndex])); // Convertimos el valor a cadena
  };

  return (
    <>
      <Text style={styles.tittleText}>Camion</Text>
      {cambios.some((row) => row.includes(true)) && (
        <>
          <Text style={[styles.tittleText, { margin: 10 }]}>
            Registro de cambio {llantaSelect}
          </Text>
          <TextInput
            style={localStyles.input} // Estilos para el TextInput
            placeholder="Observacion"
            value={texto}
            onChangeText={(text) => setTexto(text)} // Actualiza el valor de inputValue
          />
          <Button
            title={"Enviar"}
            buttonStyle={[styles.styleButton, { marginVertical: 15 }]}
          />
        </>
      )}
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={localStyles.buttonRow}>
          {row.map((number, buttonIndex) => (
            <React.Fragment key={buttonIndex}>
              {Array.isArray(number) ? (
                <>
                  {number.map((nestedNumber, nestedIndex) => (
                    <React.Fragment key={nestedIndex}>
                      <Button
                        title={String(nestedNumber)}
                        buttonStyle={[
                          localStyles.button,
                          cambios[rowIndex][buttonIndex] &&
                            localStyles.buttonSelected,
                        ]}
                        onPress={() => handleCambiar(rowIndex, buttonIndex)}
                      />
                      {nestedIndex < number.length - 1 && (
                        <View style={localStyles.buttonSeparator} />
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  <Button
                    title={String(number)}
                    buttonStyle={[
                      localStyles.button,
                      cambios[rowIndex][buttonIndex] &&
                        localStyles.buttonSelected,
                    ]}
                    onPress={() => handleCambiar(rowIndex, buttonIndex)}
                  />
                  {buttonIndex < row.length - 1 && (
                    <View style={localStyles.buttonSeparator} />
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </View>
      ))}
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
  buttonSelected: {
    backgroundColor: "red", // Cambia el color a rojo cuando está seleccionado
  },
  buttonSeparator: {
    width: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
});
