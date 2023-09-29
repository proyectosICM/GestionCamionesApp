import { Alert } from "react-native";
import { useListarElementos } from "../../Hooks/CRUDHook";
import { RGS_URL } from "../../API/apiurl";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import XLSX from "xlsx"; // Importa xlsx
import * as FileSystem from 'expo-file-system'; // Importa expo-file-system

// Define tu componente de función de React
export const CLExcel = async (id) => {
  const token = await AsyncStorage.getItem("token"); 
  console.log(`${RGS_URL}/${id}`)
  const response = await axios.get(`${RGS_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const cl = response.data;
  console.log(cl.checkListCamionModel);
  console.log(cl.checkListCamionModel.alineamiento);

  // Crea un nuevo libro de Excel
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet([{ value: "hola mundo" }]);
  // Agrega la hoja al libro
  XLSX.utils.book_append_sheet(wb, ws, "Datos");

  // Convierte el libro en un archivo binario
  const excelBinary = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  // Define la ruta del archivo Excel en el sistema de archivos de la aplicación
  const excelFilePath = `${FileSystem.documentDirectory}/Datos.xlsx`;

  try {
    // Escribe el archivo binario en la ruta especificada
    await FileSystem.writeAsStringAsync(excelFilePath, excelBinary, {
      encoding: FileSystem.EncodingType.Binary,
    });

    // Notifica al usuario que se ha creado el archivo Excel
    Alert.alert("Éxito", "Se ha creado el archivo Excel 'Datos.xlsx'");
    
    // Proporciona la ruta del archivo para que el usuario pueda descargarlo
    // Puedes mostrar un mensaje al usuario indicando que el archivo se encuentra en la carpeta de descargas de la aplicación
    const fileUri = `file://${excelFilePath}`;
    Alert.alert("Descargar archivo", `El archivo se encuentra en la carpeta de descargas de la aplicación. Puedes moverlo manualmente a la carpeta DCIM si lo deseas.`);
  } catch (error) {
    console.error("Error al crear el archivo Excel:", error);
    Alert.alert("Error", "No se pudo crear el archivo Excel");
  }

  console.log("Fin")
}
