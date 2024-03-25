import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import PersonalInfoForm from "../../../components/profile/PersonalInfo";
import {
  onChangeModalProf,
  requestDeleteAccount,
} from "../../../store/ducks/profileDuck";
import VehicleInfoForm from "../../../components/profile/VehicleInfoForm";

const MyCarScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const types = [
    {name:'Compacto / Subcompacto: 35-45 litros', value: 1},
    {name:'Sedán Mediano: 45-60 litros', value: 2},
    {name:'Sedán Grande: 60-80 litros', value: 3},
    {name:'Camioneta Pickup Compacta: 60-80 litros', value: 4},
    {name:'Camioneta Pickup Grande: 80-120 litros', value: 5},
    {name:'SUV Compacto: 50-70 litros', value: 6},
    {name:'SUV Mediano: 70-90 litros', value: 7},
    {name:'SUV Grande / Todoterreno: 80-120 litros', value: 8},
    {name:'Furgoneta / Minivan: 70-90 litros', value: 9}
  ]

  return (
    <HeaderLogged
      title="Mi auto"
      isBack={true}
      goBack={() => navigation.goBack()}
    >
      <VehicleInfoForm carTypes={types}/>
    </HeaderLogged>
  );
};

const styles = StyleSheet.create({});

export default MyCarScreen;
