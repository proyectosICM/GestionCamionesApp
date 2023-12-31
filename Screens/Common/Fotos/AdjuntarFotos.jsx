import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Camera } from "expo-camera"; // Importa Camera desde expo-camera
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "../../../Styles/General";
import { ImageBackground } from "react-native";
import { ColorIcono, fondo } from "../../../Styles/PaletaColores";
import { useAgregarElemento, useListarElementos } from "../../../Hooks/CRUDHook";
import { FallasImagenURL, ObsURL, infoURL } from "../../../API/apiurl";

export function AdjuntarFotos() {
  const [usuario, setUsuario] = useState();
  const route = useRoute();
  const rgs = route.params.rgs;
  const clc = route.params.clc;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [observacion, setObservacion] = useState(null);
  const userAccessToken = "e7eefedec49196bf8229bedb7324c29d72ef4bd3";
  const [camera, setCamera] = useState(null);
  const [nameusu, setNameusu] = useState({});
  const datosAsync = async () => {
    const usuariov = await AsyncStorage.getItem("usuario");
    setUsuario(usuariov);
    const nomusuario = await AsyncStorage.getItem("username");
    setNameusu(nomusuario);
  };

  const [info, setInfo] = useState();
  useListarElementos(`${infoURL}${nameusu}`, setInfo);

  const obtenerDatosAsync = async () => {
    const usuariov = await AsyncStorage.getItem("username");
    setUser(usuariov);
  };

  useEffect(() => {
    datosAsync();
  }, []);

  const handleImagePicker = async () => {
    if (camera) {
      try {
        const { uri } = await camera.takePictureAsync();

        if (uri) {
          setImage(uri);
        }
      } catch (error) {
        console.log("Error al tomar la foto:", error);
      }
    }
  };

  const handleEnviar = async () => {
    if (image && observacion) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("image", {
          uri: image,
          name: "image.jpg",
          type: "image/jpeg",
        });

        const response = await axios.post("https://api.imgur.com/3/image", formData, {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
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
            nameObs: `Se guardo la foto: ${observacion} Por el usuario ${info.nombre} ${info.apellido}`,
            rgsModel: {
              id: rgs,
            },
          };

          try {
            await useAgregarElemento(ObsURL, requestObs);
          } catch (error) {
            console.log(error);
          }
          Alert.alert("La imagen se subió correctamente");
        } else {
          console.log("Error al subir la imagen:", response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error al subir la imagen:", error);
        setIsLoading(false);
      }
    } else {
      Alert.alert("Agregue detalle a la observacion", "Por favor describa la falla");
    }
  };

  const handleVerImagen = () => {
    // Aquí puedes mostrar la imagen en pantalla completa o realizar cualquier otra acción que desees.
    // Por ejemplo, puedes usar un componente de visor de imágenes.
    // Puedes abrir un modal o navegar a una nueva pantalla para mostrar la imagen en pantalla completa.
    // Esto depende de la implementación específica de tu aplicación.
  };

  console.log(clc);

  return (
    <ImageBackground source={fondo} style={styles.backgroundImage}>
      <View style={styles.container}>
        {image ? (
          <>
            <Image
              source={{ uri: image }}
              style={styles2.image}
              resizeMode="contain"
              onPress={handleVerImagen} // Agrega una función para ver la imagen en pantalla completa
            />
            <Text style={[styles.tittleText, { margin: 2 }]}>Agregar una observación</Text>
            <TextInput
              style={[styles2.input, { backgroundColor: "#EBEFF2" }]}
              placeholder="Detalle la observación"
              onChangeText={(text) => setObservacion(text)}
              value={observacion}
            />
            <Button
              title={isLoading ? "Cargando..." : "Enviar"}
              onPress={handleEnviar}
              buttonStyle={styles.styleButton}
              titleStyle={styles.tittleText}
              disabled={isLoading}
            />
          </>
        ) : (
          <View style={styles2.previewContainer}>
            <Camera
              style={{ flex: 1, width: "90%", height: "90%", marginTop: "10%" }}
              type={Camera.Constants.Type.back}
              ref={(ref) => setCamera(ref)}
            ></Camera>
            <TouchableOpacity onPress={handleImagePicker} style={styles2.captureButton}>
              <Text style={styles2.captureButtonText}>Tomar Foto</Text>
            </TouchableOpacity>
            {clc == "continuar" && (
              <TouchableOpacity onPress={() => navigation.navigate("VerificacionCarreta")} style={styles2.continuar}>
                <Text style={styles2.captureButtonText}>Continuar checklist</Text>
              </TouchableOpacity>
            )}

            {clc == "cerrar" && (
              <TouchableOpacity onPress={() => navigation.navigate("Asignado")} style={styles2.continuar}>
                <Text style={styles2.captureButtonText}>Cerrar</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
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
    height: "80%",
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
    width: 240,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    width: "50%",
    alignItems: "center",
    marginHorizontal: "25%",
    marginVertical: "10%",
  },
  captureButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  continuar: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    width: "70%",
    alignItems: "center",
    marginHorizontal: "25%",
    marginBottom: "10%",
  },
});
