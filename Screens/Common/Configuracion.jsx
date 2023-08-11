import React from 'react'
import { View } from 'react-native';
import { styles } from '../../Styles/General';
import { Text } from 'react-native';
import { useState } from 'react';
import { useListarElementos } from '../../Hooks/CRUDHook';
import { useEffect } from 'react';

export function Configuracion(){
    
    const [ip, setIp] = useState();

    const ListarIp = useListarElementos("http://192.168.1.232:8080/redirigido", setIp);

    useEffect(() => {
        ListarIp();
    }, [ListarIp]);

    console.log(ip);

    return(
        <View style={styles.container}>
            <Text style={styles.tittleText}>Configuracion de Cuenta</Text>
            <Text style={styles.tittleText}>{ip}</Text>
        </View>
    );
}