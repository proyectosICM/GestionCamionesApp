import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { styles } from "../../Styles/General";
import { Button } from "react-native-elements";
import { useState } from "react";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import axios from "axios";

export function AdjuntarFotos() {
  const [image, setImage] = useState(null);
  const userAccessToken = "e7eefedec49196bf8229bedb7324c29d72ef4bd3";



  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.log("Error al tomar la foto:", error);
    }
  };

  const handleEnviar = async () => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append('image', { uri: image, name: 'image.jpg', type: 'image/jpeg' });
        
        const response = await axios.post('https://api.imgur.com/3/image', formData, {
          headers: {
            'Authorization': `Bearer ${userAccessToken}`, // Incluye el token de acceso de usuario en el encabezado de autorización.
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          // La imagen se ha subido exitosamente.
          const uploadedImageUrl = response.data.data.link;
          console.log('Imagen subida con éxito:', uploadedImageUrl);
          setImage(null);
        } else {
          console.log('Error al subir la imagen:', response.data);
        }
      } catch (error) {
        console.log('Error al subir la imagen:', error);
      }
    }
  };

  const handleVerImagen = () => {
    alert('AKER')
  }

  return (
    <View style={styles.container}>

        <View style={styles.previewContainer}>
          <Button
            title={"Tomar foto"}
            buttonStyle={styles.styleButton}
            titleStyle={styles.textoButton}
            onPress={() => handleImagePicker()}
          />
        </View>

      <Button title={"Ver imagen"} onPress={() => handleVerImagen()} />
    </View>
  );
}
