import React from 'react';
import { View, FlatList } from 'react-native';
import { styles } from '../../Styles/General';
import { ItemCamion } from './MenuCamiones/ItemCamion';

export function MenuCamiones() {
  const data = [
    { id: '1', title: 'ABC-002', description: 'Buen estado' },
    { id: '2', title: 'ABC-002', description: 'Buen estado' },
    { id: '3', title: 'ABC-002', description: 'Buen estado' },
    { id: '4', title: 'ABC-002', description: 'Buen estado' },
    { id: '5', title: 'ABC-002', description: 'Buen estado' },
    { id: '6', title: 'ABC-002', description: 'Buen estado' },
    { id: '7', title: 'ABC-002', description: 'Buen estado' },
    { id: '8', title: 'ABC-002', description: 'Buen estado' },
    { id: '9', title: 'ABC-002', description: 'Buen estado' },
    { id: '10', title: 'ABC-002', description: 'Buen estado' },
    { id: '11', title: 'ABC-002', description: 'Buen estado' },
    { id: '12', title: 'ABC-002', description: 'Buen estado' },
    { id: '13', title: 'ABC-002', description: 'Buen estado' },
    { id: '14', title: 'ABC-002', description: 'Buen estado' }
  ];

  const renderItem = ({ item }) => (
    <ItemCamion title={item.title} description={item.description} />
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Establece el número de columnas deseado
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}
