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

  return (
    <HeaderLogged
      title="Mi auto"
      isBack={true}
      goBack={() => navigation.goBack()}
    >
      <VehicleInfoForm />
    </HeaderLogged>
  );
};

const styles = StyleSheet.create({});

export default MyCarScreen;
