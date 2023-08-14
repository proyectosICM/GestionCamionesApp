import React from "react";
import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const QRCodeGenerator = ({ idRgs }) => {
  const data = `${idRgs}`;

  return (
    <View style={styles.container}>
      <QRCode
        value={data}
        size={100} // Tamaño del código QR
        color="black" // Color del código QR
        backgroundColor="white" // Color de fondo del código QR
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 120,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QRCodeGenerator;
