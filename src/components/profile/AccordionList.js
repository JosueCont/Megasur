import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import AccordionItem from "./AccordionItem";
import PersonalInfoForm from "./PersonalInfo";
import { useSharedValue } from "react-native-reanimated";

const AccordionList = ({data, isLocation=false}) => {

    return(
        <View>
            {data?.map((item,index) => <AccordionItem item={item} index={index} isLocation={isLocation}/>)}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default AccordionList;