import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, } from "react-native";
import { getFontSize } from "../../../utils/functions";
import { Colors } from "../../../utils/Colors";
import HeaderLogged from "../../../components/Headers/HeaderLogged";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";

const {height, width} = Dimensions.get('window');

const ConfirmFuelExchange = () => {
    const navigation = useNavigation()
    return(
        <HeaderLogged 
            title="Redención de puntos" 
            isBack={true} 
            goBack={() => navigation.goBack()}
            bgColor={Colors.white} >
            <View style={styles.container}>
                <View style={{height: height/3, width: width,}}>
                    <Video  
                        source={require('../../../../assets/confeti.mp4')}
                        style={{width: width, height: height/3, position:'relative', top:20}}
                        useNativeControls={false}
                        resizeMode="cover"
                        isLooping
                        shouldPlay
                        
                    />
                </View>
                <Text style={styles.title}>¡Excelente!</Text>
                <View style={styles.contLegend}>
                    <Text style={styles.legend}>Canjeaste 800 pts por gasolina.</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('House')}>
                <Text style={styles.lblBtn}>Continuar</Text>
                </TouchableOpacity>

            </View>
        </HeaderLogged>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Colors.white
    },
    title:{
        fontSize: getFontSize(50),
        fontWeight: '800',
        color: Colors.blueGreen,
        marginBottom:20,
    },
    contLegend:{
        width: width/1.2, 
        marginBottom:30
    },
    legend:{
        fontSize: getFontSize(22), 
        fontWeight:'700', 
        color: Colors.darkGray, 
        textAlign:'center'
    },
    btn:{
        width: width/1.2, 
        height:44, 
        backgroundColor: Colors.blueGreen, 
        borderRadius:8, 
        alignSelf:'center', 
        justifyContent:'center', 
        alignItems:'center'
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    }
})

export default ConfirmFuelExchange;
