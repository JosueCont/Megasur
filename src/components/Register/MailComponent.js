import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import Input from "../CustomInput";

const {height, width} = Dimensions.get('window');

const MailComponent = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Genial, ¿cuál es tu correo electrónico?</Text>
            <Input />
            <View style={{ width: width/1.4}}>
                <Text style={styles.legend}>¡Gracias por confiar en nosotros!Te prometemos no enviarte spam.</Text>
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
    }
})
export default MailComponent;