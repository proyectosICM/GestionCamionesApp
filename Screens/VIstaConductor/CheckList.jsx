import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "react-native-elements";
import { useState } from "react";
import { Tabla } from "../Common/Tabla";
import { styles } from "../../Styles/General";
import { CustomBottomTabBar } from "../../CustomBottomTabBar";

export default function CheckList() {
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

  /*
  const [marcar, setMarcar] = useState(
    Array.from({ length: tables.length }, () => Array(tables[0].datos.length).fill(null))
  );
*/

  const [marcar, setMarcar] = useState(() =>
    tables.map((table) => Array(table.datos.length).fill(null))
  );

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
      <Text style={styles.tittleText}>CheckList</Text>
      <Tabla
        titulo={tables[currentTable].titulo}
        datos={tables[currentTable].datos}
        marcar={marcar[currentTable]}
        setMarcar={(estado) => {
          const newMarcar = [...marcar];
          newMarcar[currentTable] = estado;
          setMarcar(newMarcar);
        }}
      />
      <Button
        title="Atras"
        type="outline"
        onPress={handleBack}
        buttonStyle={{ backgroundColor: "#ccc", width: 150 }}
        titleStyle={{ color: "black" }}
        disabled={currentTable === 0}
      >
        Anterior
      </Button>
      <Button
        title="Siguiente"
        type="outline"
        onPress={handleNext}
        buttonStyle={{ backgroundColor: "white", width: 150 }}
        disabled={currentTable === tables.length - 1}
      >
        Siguiente
      </Button>
    </View>
  );
}
