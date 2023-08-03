import axios from "axios";
import { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useListarElementos(url, setDatos) {
  const navigation = useNavigation();
  
  const fetchData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Espera a que se resuelva la promesa para obtener el token
      const results = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatos(results.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Token expirado, redirigir al inicio de sesión
        //navigation.navigate("Login");
        console.log(url);
        console.log(token);
      } else {
        // Otro error, manejarlo adecuadamente
        //console.error(`Error al obtener los datos del camión: ${url}`, error);
      }
    }
  }, [navigation, setDatos, url]);

  useEffect(() => {
    fetchData(); // Llama a fetchData al montar el componente
  }, [fetchData]);

  return fetchData;
}

export async function useAgregarElemento(url, requestData) {
  try {
    const token = await AsyncStorage.getItem("token");
    //console.log("datos", requestData);
    const response = await axios.post(url, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response; // Retorna el resultado de la solicitud POST
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error para que puedas manejarlo en el componente
  }
}
export async function useEditarUnElemento(url, id, est, value) {
  const nurl = `${url}/${id}`;
  const token = await AsyncStorage.getItem("token");

  try {
    const response = await axios.get(nurl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const elemento = response.data;
    elemento[est] = value;
    console.log(elemento);
    await axios.put(nurl, elemento, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
