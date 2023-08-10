import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { Touchable } from "react-native";
import QRScanner from "../../QRScanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../Styles/General";
import { Button } from "react-native-elements";
import { ImageBackground } from "react-native";
const fondo1 = require("../../Styles/fondo5.jpg");
const qr = require("../../Styles/icmLogo.png")
export default function VerificacionCamion({ navigation }) {
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
      tc={"Camion"}
    />
  ) : (
    <ImageBackground source={fondo1} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Image source={qr} style={{width:100, height:100, marginVertical: 20}}/>
      <Text style={styles.tittleText}>Escanear QR de camion</Text>
      <Text>Escanee el codigo QR de un camion para empezar a realizar el CheckList</Text>
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
