import React from 'react'
import { Text } from 'react-native';
import { View } from 'react-native';
import { styles } from '../../../Styles/General';

export function NotificacionesConductor(){
    return(
        <View style={styles.container}>
            <Text style={styles.tittleText}>Notificaciones</Text>
        </View>
    );
}