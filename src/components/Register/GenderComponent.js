import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Input from "../CustomInput";
import {Select} from 'native-base'

const {height, width} = Dimensions.get('window');

const GenderComponent = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Elige tu género, ¡queremos personalizar tu experiencia!</Text>
            <View style={styles.input}>
                <Select
                borderWidth={0}
                placeholder="Escoge tu genero"
                    style={{}}></Select>

            </View>
            <View style={{ width: width/1.4}}>
                <Text style={styles.legend}>Conocer tu género nos permite ofrecerte productos relevantes.</Text>
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
        color: Colors.darkGray,
        textAlign:'center',
        marginBottom:60
    },
    legend:{
        fontSize: getFontSize(14),
        fontWeight:'400',
        textAlign:'center',
        marginTop:50
    },
    input:{
        backgroundColor: Colors.white,
        width:width/1.13, 
        height: 50,  
        borderRadius:8, 
        padding:7,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    }
})
export default GenderComponent;