import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon } from "react-native-elements";
import { Button } from "react-native-elements";
import { FontAwesome } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { infoURL } from "../../API/apiurl";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  buttonContainer: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  iconContainer: {
    marginBottom: 20,
  },
});

export function Cuenta({ navigation }) {
  const [user, setUser] = useState("");
  const [usuario, setUsuario] = useState({});
  
  useEffect(() => {
    const obtenerDatosAsync = async () => {
      const usuariov = await AsyncStorage.getItem("username");
      setUser(usuariov);
    };
    obtenerDatosAsync();
  }, []);

  const ListarUsuarios = useListarElementos(`${infoURL}${user}`, setUsuario);

  useEffect(() => {
    ListarUsuarios();
  }, [ListarUsuarios]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUser("");
      console.log(
        "Sesión cerrada. Todos los datos eliminados de AsyncStorage."
      );
      navigation.navigate("Login-");
    } catch (error) {
      console.log("Error al cerrar la sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="user-circle" type="font-awesome" size={50} color="#333" />
      </View>
      <Text style={styles.title}>Hola, {user}</Text>
      <Text style={styles.title}>
        Nombre: {usuario.nombre} {usuario.apellido}
      </Text>
      <Text style={styles.title}>Rol: {usuario.rolesModel?.nombre}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="  Cambiar Contraseña"
          onPress={() => {
            /* Agrega aquí la lógica para cambiar la contraseña */
          }}
          icon={<FontAwesome name="key" size={20} color="white" />}
          buttonStyle={{ backgroundColor: "#007bff" }}
        />
      </View>
      <Button
        title="Cerrar Sesión"
        onPress={() => handleLogout()}
        icon={<FontAwesome name="sign-out" size={20} color="white" />}
        buttonStyle={{ backgroundColor: "#ff6347" }}
      />
    </View>
  );
}
