import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Icon, Divider } from "react-native-elements";
import { Button } from "react-native-elements";
import { FontAwesome } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { infoURL } from "../../API/apiurl";
import { ImageBackground } from "react-native";
import { ColorIcono, ColorTexto, ColorTextoBoton, fondo } from "../../Styles/PaletaColores";

export function Cuenta({ navigation }) {
  const [user, setUser] = useState("");
  const [usuario, setUsuario] = useState({});
  const obtenerDatosAsync = async () => {
    const usuariov = await AsyncStorage.getItem("username");
    setUser(usuariov);
  };

  useEffect(() => {
    obtenerDatosAsync();
  }, [obtenerDatosAsync]);

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

  const ListarUsuarios = useListarElementos(`${infoURL}${user}`, setUsuario, "logout");

  useEffect(() => {
    ListarUsuarios();
  }, [ListarUsuarios]);
 


  return (
    <ImageBackground source={fondo}  style={styles.backgroundImage}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="user-circle" type="font-awesome" size={80} color="#333" />
      </View>
      <Text style={[styles.title, {textAlign:"center"}]}>¡Hola, {user}!</Text>
      <Divider style={{ backgroundColor: "#333", marginVertical: 10 }} />
      <Text style={styles.subtitle}>
        Nombre: {usuario.nombre} {usuario.apellido}
      </Text>
      <Text style={styles.subtitle}>Rol: {usuario.rolesModel?.nombre}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title=" Cambiar Contraseña"
          onPress={() => {
            alert("Este modulo aun no esta disponible");
          }}
          icon={<FontAwesome name="key" size={20} color={ColorIcono} />}
          buttonStyle={{ backgroundColor: "#007bff", marginBottom: 10 }}
          titleStyle={{color: ColorTextoBoton}}
        />
        <Button
          title=" Editar Perfil"
          onPress={() => {
            alert("Este modulo aun no esta disponible");
          }}
          icon={<FontAwesome name="edit" size={20} color={ColorIcono} />}
          buttonStyle={{ backgroundColor: "#28a745", marginBottom: 10 }}
          titleStyle={{color: ColorTextoBoton}}
        />
        <Button
          title=" Historial de Actividades"
          onPress={() => {
            alert("Este modulo aun no esta disponible");
          }}
          icon={<FontAwesome name="history" size={20} color={ColorIcono} />}
          buttonStyle={{ backgroundColor: "#6c757d" }}
          titleStyle={{color: ColorTextoBoton}}
        />
      </View>
      <Button
        title=" Cerrar Sesión"
        onPress={() => handleLogout()}
        icon={<FontAwesome name="sign-out" size={20} color={ColorIcono} />}
        buttonStyle={{ backgroundColor: "#ff6347", marginTop: 20 }}
        titleStyle={{color: ColorTextoBoton}}
      />
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#f4f4f4",
    padding: 80,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: ColorTexto
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: ColorTexto
  },
  buttonContainer: {
    marginTop: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});