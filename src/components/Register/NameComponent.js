import React,{useState,useEffect} from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import Input from "../CustomInput";

const {height, width} = Dimensions.get('window');

const NameComponent = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>¿Nos dices tu nombre, por favor?</Text>
            <View style={styles.contForm}>
                <Text style={styles.lbl}>Nombre(s)</Text>
                <Input />
                <Text style={[styles.lbl,{marginTop:13}]}>Apellido(s)</Text>
                <Input />
            </View>
            <View style={{ width: width/1.2}}>
                <Text style={styles.legend}>Queremos saludarte por tu nombre cuando nos visites</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    title:{
        fontSize: getFontSize(24),
        fontWeight:'400',
        color: Colors.darkGray
    },
    contForm:{
        alignSelf:'flex-start', 
        marginLeft:25, 
        marginTop:20, 
        marginBottom:40
    },
    lbl:{
        fontSize:getFontSize(14), 
        color: Colors.grayStrong, 
        fontWeight:'400', 
        marginBottom:4
    },
    legend:{
        fontSize: getFontSize(14), 
        fontWeight:'400', 
        textAlign:'center'
    }
})

export default NameComponent;