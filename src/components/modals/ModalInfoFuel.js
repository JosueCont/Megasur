import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";

const { height, width } = Dimensions.get("window");

const ModalInfoFuel = ({ visible, setVisible, message }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.card}>
            <View style={{paddingBottom:4, borderBottomWidth: 2, borderBottomColor: Colors.borders, marginBottom:10}}>
                <Text style={{color: Colors.darkGray, fontSize: getFontSize(15), fontWeight:'700'}}>Información canje de combustible</Text>

            </View>
          <Text style={styles.message}>
            La barra de progreso de combustible es una representación aproximada y se genera en función de la información
            registrada de su vehículo en la sección <Text style={{fontWeight:'bold'}}>Perfil</Text>, así como la cantidad de puntos acumulados y el costo promedio 
            de combustible en nuestras estaciones.
          </Text>
          <TouchableOpacity style={styles.btn} onPress={setVisible}>
            <Text style={styles.txtBtn}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.85,
    //height: height/4,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  message: {
    marginBottom: 18,
    marginTop: 15,
    fontSize: getFontSize(13),
    fontWeight: "400",
    color: Colors.darkGray,
    textAlign: "justify",
  },
  btn: {
    width: 120,
    height: 40,
    backgroundColor: Colors.blueGreen,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtn: {
    fontSize: getFontSize(16),
    fontWeight: "700",
    color: Colors.white,
  },
});

export default ModalInfoFuel;
