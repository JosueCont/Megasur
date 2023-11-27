import React,{useEffect,useState} from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { StatusBar } from 'expo-status-bar';
import { Video } from "expo-av";


const {height, width} = Dimensions.get('window');

const RegisterDone = () => {
    return(
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.lightGray}
                color={Colors.white}
                style="dark"
                hidden={false}
            />
            <View style={{height: height/3, width: width}}>
                <Video  
                    source={require('../../../assets/confeti.mp4')}
                    style={{width: width, height: height/3,}}
                    useNativeControls={false}
                    resizeMode="cover"
                    isLooping
                    shouldPlay
                />
            </View>
            <Text style={styles.title}>¡Gracias!</Text>
            <View style={styles.contLegend}>
                <Text style={styles.legend}>Estás oficialmente listo para desbloquear un mundo de recompensas y ahorros. ¡Vamos a empezar!</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.lblBtn}>Continuar</Text>
            </TouchableOpacity>
        </View>
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
        fontSize: getFontSize(73),
        fontWeight: '800',
        color: Colors.green,
        marginBottom:100
    },
    contLegend:{
        width: width/1.2, 
        marginBottom:30
    },
    legend:{
        fontSize: getFontSize(24), 
        fontWeight:'400', 
        color: Colors.darkGray, 
        textAlign:'center'
    },
    btn:{
        width: width/1.2, 
        height:44, 
        backgroundColor: Colors.green, 
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

export default RegisterDone;