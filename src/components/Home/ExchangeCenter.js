import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import FuelLoader from "../FuelLoader";
import { Feather } from '@expo/vector-icons'; 

const {height, width} = Dimensions.get('window');

const ExchangeCenter = () => {
    return(
        <View style={styles.card}>
            <View style={styles.contHeader}>
                <Text style={styles.title}>Centro de canje</Text>
                <TouchableOpacity>
                    <Feather name="alert-circle" size={20} color="black" />

                </TouchableOpacity>
            </View>
            <FuelLoader withBorder={false} flow={1} color={Colors.green} isBig={true}/>
            <View style={styles.contBtn}>
                <TouchableOpacity style={styles.btn}><Text style={styles.lbl}>Canjear combustible</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btn}><Text style={styles.lbl}>Canjear artículos</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width: width/1.1, 
        height:160, 
        borderRadius:8, 
        backgroundColor: Colors.white, 
        alignSelf:'center',
        padding:14,
        marginBottom:25,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    contHeader:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginBottom:12
    },
    title:{
        color: Colors.blackInit,
        fontSize: getFontSize(18),
        fontWeight:'700'
    },
    btn:{
        width: width/2.6, 
        height:44, 
        backgroundColor: Colors.blueGreen, 
        borderRadius:8, 
        justifyContent:'center',
        alignItems:'center'
    },
    contBtn:{
        flexDirection:'row', 
        marginTop:24, 
        flex:1, 
        justifyContent:'space-between'
    },
    lbl:{
        fontSize: getFontSize(14),
        color: Colors.white,
        fontWeight:'400'
    }
})

export default ExchangeCenter;