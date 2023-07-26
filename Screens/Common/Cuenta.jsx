import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { styles } from "../../Styles/General";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Cuenta() {
  const [user, setUser] = useState("");

  useEffect(() => {
    // Función asincrónica para obtener el valor de 'user' de AsyncStorage
    const getUserFromAsyncStorage = async () => {
      try {
        const userValue = await AsyncStorage.getItem("user");
        if (userValue !== null) {
          setUser(userValue);
        }
      } catch (error) {
        console.log("Error al obtener el usuario de AsyncStorage:", error);
      }
    };

    // Llamar a la función para obtener el valor de 'user' al cargar el componente
    getUserFromAsyncStorage();
  }, []); // El arreglo vacío [] asegura que este efecto solo se ejecute una vez al montar el componente

  const handleUser = async (op) => {
    setUser(op);
    try {
      await AsyncStorage.setItem("user", op);
    } catch (error) {
      console.log("Error al guardar el usuario en AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Cuenta usted es</Text>
      <Button
        title="Conductor"
        buttonStyle={styles.styleButton}
        onPress={() => handleUser("CONDUCTOR")}
      />
      <Text></Text>
      <Button
        title="Mecanico"
        buttonStyle={styles.styleButton}
        onPress={() => handleUser("MECANICO")}
      />
      <Text></Text>
      <Button
        title="Administrador"
        buttonStyle={styles.styleButton}
        onPress={() => handleUser("ADMINISTRADOR")}
      />
      <Text>{user}</Text>
    </View>
  );
}
