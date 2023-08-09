import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../../../Styles/General'
import { useRoute } from '@react-navigation/native'

export function GaleriaImagenes(){
    const route = useRoute();

    const idRgs = route.params.idRgs;
    return(
        <View style={styles.container}>
            <Text style={styles.tittleText}>As {idRgs}</Text>
        </View>
    )
}