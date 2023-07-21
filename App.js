import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import QRScanner from './QRScanner';
import VerificacionCamion from './Screens/VIstaConductor/VerificacionCamion';
import Login from './Screens/Login/Login';
import CamionDetalle from './Screens/Common/CamionDetalle';
import { Tabla } from './Screens/Common/Tabla';
import { Button } from 'react-native-elements';
import { useState } from 'react';


export default function App() {
  const [currentTable, setCurrentTable] = useState(0);

  const tables = [
    {
      titulo: "Llantas",
      datos: [
        "Revisar ajuste",
        "Cortes y averias",
        "Revisar Presion recomendada",
      ],
    },
    {
      titulo: "Motor",
      datos: [
        "Niveles de Motor",
        "Sistema de lubricacion de fugas",
        "Sistema de combustible",
      ],
    },
    {
      titulo: "Sistema Electrico",
      datos: [
        "Luces",
        "Sistema de carga",
        "Mandos tablero",
        "Sistema de arranque",
        "Ruidos anormales",
        "Otros equipos electricos",
      ],
    },
    {
      titulo: "Trasmision",
      datos: [
        "Embrague",
        "Caja de cambio",
        "Diferencial",
        "Cardanes",
        "Ruidos Anormales",
      ],
    },
    {
      titulo: "Direccion",
      datos: [
        "Seryo",
        "Alineamiento",
        "Pines, bocinas, terminales",
        "Caja de Direcion",
      ],
    },
    {
      titulo: "Frenos",
      datos: [
        "Limpieza y regulacion",
        "Presion de aire",
        "Freno de estacionamiento",
      ],
    },
    {
      titulo: "Suspension",
      datos: [
        "Muelles, Bolsas de aire",
        "Amortiguadores",
        "Ejes barra estabilizadora",
      ],
    },
    {
      titulo: "Cabina",
      datos: [
        "Carroceria: Parabrisas, puertas, chapas, asientos",
        "Chasis: Tornamesas, Bastidor",
      ],
    },
  ];

  const handleBack = () => {
    if (currentTable > 0) {
      setCurrentTable(currentTable - 1);
    }
  };

  const handleNext = () => {
    if (currentTable < tables.length - 1) {
      setCurrentTable(currentTable + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CheckList</Text>
      <Tabla titulo={tables[currentTable].titulo} datos={tables[currentTable].datos} />
      <Button title="Atras"
        type="outline" onPress={handleBack} disabled={currentTable === 0}>Anterior</Button>
      <Button title="Siguiente"
        type="outline" onPress={handleNext} disabled={currentTable === tables.length - 1}>Siguiente</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
