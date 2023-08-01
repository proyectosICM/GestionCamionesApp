import React from 'react'
import { Text } from 'react-native';
import { styles } from '../../Styles/General';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useListarElementos } from '../../Hooks/CRUDHook';
import { baseURL } from '../../API/apiurl';

export function DetallePanel({placa, marca, modelo}){
    const [camion, setCamion] = useState();
    const [rol, setRol] = useState();
    const [camionid, setCamionid] = useState();
  
    const datosAsync = useCallback(async () => {
      const rolv = await AsyncStorage.getItem("rol");
      const camionidv = await AsyncStorage.getItem("camionid");
      setRol(rolv);
    }, []);
  
    useEffect(() => {
      datosAsync();
    }, [datosAsync]);
  
    const ListarCamion = useListarElementos (
      `${baseURL }camiones/${camionid}`,
      setCamion
    );
  
    useEffect(() => {
      ListarCamion();
    }, [ListarCamion]);
    return(
        <>
          <Text style={styles.tittleText}>Placa: {placa} </Text>
          <Text style={styles.tittleText}>
            Marca: {marca} 
          </Text>
          <Text style={styles.tittleText}>
            Modelo {modelo}
          </Text>
        </>
    );
}