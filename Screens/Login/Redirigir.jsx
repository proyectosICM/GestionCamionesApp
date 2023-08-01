import React, { useEffect, useState, useCallback } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { useListarElementos } from "../../Hooks/CRUDHook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { infoURL } from "../../API/apiurl";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../Styles/General";

export function Redirigir({ navigation }) {
  const [info, setInfo] = useState();
  const [user, setUser] = useState(null);
  const [showText, setShowText] = useState(false); // Estado para controlar si se muestra el texto "Hola" o no

  const fetchData = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    const username = await AsyncStorage.getItem("username");
    setUser(username);
    console.log(token);
    console.log(username);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const ListarInfo = useListarElementos(`${infoURL}${user}`, setInfo);

  useEffect(() => {
    ListarInfo();
  }, [ListarInfo]);

  useEffect(() => {
    const obtenerDatosUser = async () => {
      if (info) {
        await AsyncStorage.setItem("rol", info.rolesModel.nombre);
        await AsyncStorage.setItem("empresa", info.empresasModel.id.toString());
        await AsyncStorage.setItem("sede", info.sedesModel.id.toString());
        await AsyncStorage.setItem("usuario", info.id.toString());
        if (info.camionesModel != null) {
          await AsyncStorage.setItem(
            "camion",
            info.camionesModel.id.toString()
          );
        }

        navigation.navigate("Inicio");
        setTimeout(() => {
          setShowText(true); // Ocultar el texto después de 2 segundos
        }, 2000); // Navegar a la pantalla "Inicio" después de 2 segundos
      }
    };
    obtenerDatosUser();
  }, [info, navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUser("");
      console.log(
        "Sesión cerrada. Todos los datos eliminados de AsyncStorage."
      );
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error al cerrar la sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Cargando... </Text>
      {showText && (
        <>
          <Text style={styles.tittleText}>
            Algo a fallado en su inico de sesion
          </Text>
          <Text style={styles.tittleText}>Por favor cierra sesion </Text>
          <Text style={styles.tittleText}>
            y comunicate con tu administrador
          </Text>
          <Button
            title="Cerrar Sesión"
            buttonStyle={styles.styleButton}
            titleStyle={styles.tittleText}
            onPress={() => handleLogout()}
          />
        </>
      )}
      <Button
        title="Cerrar Sesión"
        buttonStyle={styles.styleButton}
        titleStyle={styles.tittleText}
        onPress={() => handleLogout()}
      />
    </View>
  );
}
