import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import AccordionItem from "./AccordionItem";
import PersonalInfoForm from "./PersonalInfo";
import { useSharedValue } from "react-native-reanimated";

const AccordionList = () => {

    const data = [
        {id:'1', title:'Información personal', component: <PersonalInfoForm />},
        {id:'2', title:'Datos de tu vehículo', component:''},
        {id:'3', title:'Facturación', component:''},
        {id:'4', title:'Encuestas contestadas', component:''},
        {id:'5', title:'Terminos de uso', component:''},
        {id:'6', title:'Privacidad de datos', component:''},
        {id:'7', title:'Vincular tarjeta física', component:''},
        {id:'8', title:'Borrar cuenta', component:''},
        {id:'9', title:'Acerca de', component:''},

    ]
    return(
        <View>
            {data.map((item,index) => <AccordionItem item={item} index={index} />)}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default AccordionList;