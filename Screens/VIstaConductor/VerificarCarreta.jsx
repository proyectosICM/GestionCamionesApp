import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { Touchable } from "react-native";
import QRScanner from "../../QRScanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../Styles/General";
import { Button } from "react-native-elements";
import { ImageBackground } from "react-native";
import { fondo } from "../../Styles/PaletaColores";

export default function VerificacionCarreta({ navigation }) {
  const [abrir, setAbrir] = useState(false);
  const handleAbrirCamera = () => {
    setAbrir(true);
  };

  const handleCerrarCamera = () => {
    setAbrir(false);
  };

  return abrir ? (
    <QRScanner
      cerrar={handleCerrarCamera}
      navigate={navigation.navigate}
      tc={"Carreta"}
    />
  ) : (
    <ImageBackground source={fondo} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.tittleText}>Escanear QR de Carreta</Text>
        <Text></Text>
        <Button
          title=" Abrir Camara "
          type="outline"
          buttonStyle={styles.styleButton}
          titleStyle={styles.textoButton}
          /*icon={<FontAwesome name="camera" size={20}  color="red" />}*/
          icon={{
            name: "camera",
            type: "font-awesome",
            size: 25,
            color: "white",
          }} 
          iconRight
          onPress={handleAbrirCamera}
        />
      </View>
    </ImageBackground>
  );
}
