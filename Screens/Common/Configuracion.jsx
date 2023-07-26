import React from 'react'
import { View } from 'react-native';
import { styles } from '../../Styles/General';
import { Text } from 'react-native';

export function Configuracion(){
    return(
        <View style={styles.container}>
            <Text style={styles.tittleText}>Configuracion de Cuenta</Text>
        </View>
    );
}