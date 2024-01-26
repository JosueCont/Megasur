import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, } from "react-native";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { onChangeType } from "../../../store/ducks/exchangeDuck";
const {height, width} = Dimensions.get('window');


const ConfirmExchange = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    return(
        <View style={styles.container}>
            <Text style={styles.title}>¡Felicidades!</Text>
            <Text style={styles.subtitle}>Te notificaremos cuando tu(s) producto(s) haya(n) llegado.</Text>
            <Text style={styles.desc}>También puedes verificar su estado en <Text style={{fontWeight:'700'}}>Artículos canjeados</Text></Text>
            <View style={styles.contBtn}>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={() => navigation.navigate('House')}>
                    <Text style={styles.lblBtn}>Volver al inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={() => {
                        //Accion para cambiar tipo en exchange
                        dispatch(onChangeType(2))
                        navigation.navigate('Exchange')
                    }}>
                    <Text style={styles.lblBtn}>Ver Artículos Cajeados</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: Colors.lightGray, 
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color: Colors.blueGreen, 
        fontSize: getFontSize(56), 
        fontWeight:'700', 
        marginBottom:16
    },
    subtitle:{
        textAlign:'center', 
        width: width/1.8,
        color: Colors.darkGray,
        fontSize: getFontSize(14),
        fontWeight:'400', 
        marginBottom:28
    },
    desc:{
        textAlign:'center',
        width: width/1.5,
        fontSize: getFontSize(16),
        fontWeight:'400',
        marginBottom:50
    },
    contBtn:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width: width/1.2,
    },
    btn:{
        width: 120,
        height:44,
        backgroundColor: Colors.blueGreen,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    },
    lblBtn:{
        color: Colors.white,
        fontSize: getFontSize(14),
        fontWeight:'400',
        textAlign:'center'
    }
})

export default ConfirmExchange