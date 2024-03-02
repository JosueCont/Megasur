import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground,} from "react-native";
import { Switch } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import LogoMega from "../../../assets/svg/LogoMega";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const {height, width} = Dimensions.get('window');

const SwitchNotification = () => {
    return(
        <>
            <View style={styles.container}>
                <View style={{ width: width/2.4}}>
                    <Text style={styles.title}>Notifiacaciones</Text>
                    <Text style={styles.lbl}>Activa tus notificaciones para recibir promociones.</Text>
                </View>
                <Switch size={'sm'} colorScheme={'green'}/>
            </View>
        
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',  
        justifyContent:'space-between', 
        alignItems:'center',
        marginBottom:20,
        marginTop:5
    },
    title:{
        color: Colors.darkGray, 
        fontSize: getFontSize(16), 
        fontWeight:'500', 
        marginBottom:4
    },
    lbl:{
        color: Colors.grayStrong, 
        fontSize: getFontSize(13), 
        fontWeight:'400'
    },
    border:{
        borderWidth:0.5, 
        borderColor: Colors.grayStrong,
        marginTop:20, 
        marginHorizontal:10
    }
})

export default SwitchNotification;