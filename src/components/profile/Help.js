import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

const Help = ({pressed}) => {
    return(
        <TouchableOpacity style={styles.container} onPress={pressed}>
            <FontAwesome5 name="headset" size={20} color={Colors.white} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor: Colors.greenStrong,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:20,
        right:10,
    }
})

export default Help;