import React from "react";
import { Text, TextInput } from "react-native";
import { View } from "react-native";

import { Button } from "react-native-elements";
import { useState } from "react";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import axios from "axios";
import { useAgregarElemento } from "../../../Hooks/CRUDHook";
import { FallasImagenURL, ObsURL } from "../../../API/apiurl";
import { StyleSheet } from "react-native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { styles } from "../../../Styles/General";
import { ImageBackground } from "react-native";
import { ColorIcono, fondo } from "../../../Styles/PaletaColores";

export function AdjuntarFotos() {
  const [usuario, setUsuario] = useState();
  const route = useRoute();
  const rgs = route.params.rgs;
  const [isLoading, setIsLoading] = useState(false);

  const datosAsync = useCallback(async () => {
    const usuariov = await AsyncStorage.getItem("usuario");
    setUsuario(usuariov);
  }, []);

  useEffect(() => {
    datosAsync();
    console.log("sdad")
  }, [datosAsync]);

  const [image, setImage] = useState(null);
  const [observacion, setObservacion] = useState(null);
  const userAccessToken = "e7eefedec49196bf8229bedb7324c29d72ef4bd3";

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result) {
        setImage(result.uri);

        console.log("axas");
        //console.log(result);
      }
    } catch (error) {
      console.log("Error al tomar la foto:", error);
    }
  };

  const handleEnviar = async () => {
    if (image) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("image", {
          uri: image,
          name: "image.jpg",
          type: "image/jpeg",
        });

        const response = await axios.post(
          "https://api.imgur.com/3/image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${userAccessToken}`, // Incluye el token de acceso de usuario en el encabezado de autorización.
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          // La imagen se ha subido exitosamente.
          const uploadedImageUrl = response.data.data.link;
          console.log("Imagen subida con éxito:", uploadedImageUrl);

          const requestData = {
            urlImage: uploadedImageUrl,
            observacion: observacion,
            usuariosModel: {
              id: usuario,
            },
            rgsModel: {
              id: rgs,
            },
          };
          await useAgregarElemento(FallasImagenURL, requestData);

          setImage(null);
          setObservacion("");

          const requestObs = {
            nameObs: `Se guardo la foto: ${observacion} Por el usuario  `,
            rgsModel: {
                id: rgs,
            }
          }
       
          try {
            await useAgregarElemento(ObsURL, requestObs);
          } catch (error) {
            console.log(error);
          }
          Alert.alert("La imagen se subio correctamente");
        } else {
          console.log("Error al subir la imagen:", response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error al subir la imagen:", error);
        setIsLoading(false);
      }
    }
  };

  const handleVerImagen = () => {
    alert("AKER");
  };

  return (
    <ImageBackground source={fondo} style={styles.backgroundImage}>
      <View style={styles.container}>
        {image ? (
          <>
            <Image
              source={{ uri: image }}
              style={styles2.image}
              resizeMode="contain"
            />
            <Text style={[styles.tittleText, { margin: 2 }]}>
              Agrege la observacion
            </Text>
            <TextInput
            style={[styles2.input,{backgroundColor: '#EBEFF2'}]} 
              placeholder="Detalle la observacion"
              onChangeText={(text) => setObservacion(text)}
              value={observacion}
            />
            <Button
              title={isLoading ? "Cargando..." : "Enviar"}
              onPress={handleEnviar}
              buttonStyle={styles.styleButton}
              titleStyle={styles.tittleText}
              disabled={isLoading} // Deshabilita el botón cuando está en modo de carga
            />
          </>
        ) : (
          <View style={styles2.previewContainer}>
            <Button
              title="Tomar Foto"
              onPress={handleImagePicker}
              buttonStyle={styles.buttonPalette}
              titleStyle={styles.tittleText}
              icon={{
                name: "camera",
                type: "font-awesome",
                size: 25,
                color: ColorIcono
              }}
            />
          </View>
        )}
        {/* zona para la imagen */}
      </View>
    </ImageBackground>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  previewContainer: {
    width: "80%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  image: {
    width: "50%",
    height: "50%",
  },
  input: {
    width: 240, // Ancho del 80% del contenedor
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
