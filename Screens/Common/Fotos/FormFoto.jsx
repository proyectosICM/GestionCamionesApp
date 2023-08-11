import React from 'react'
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from '../../../Styles/General';

export function FormFoto({image}){
    return(
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
            style={[styles.input,{backgroundColor: '#EBEFF2'}]} 
          placeholder="Detalle la observacion"
          onChangeText={(text) => setObservacion(text)}
          value={observacion}
        />
        <Button
          title={"Enviar"}
          onPress={handleEnviar}
          buttonStyle={styles.styleButton}
          titleStyle={styles.tittleText}
        />
      </>
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
  