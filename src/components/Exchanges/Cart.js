import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

const Cart = ({pressed, products=0,}) => {
    return(
        <TouchableOpacity style={styles.container} onPress={pressed}>
            <Image source={require('../../../assets/cart.png')} style={styles.img}/>
            <Text style={styles.lbl}>{products}</Text>
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
    },
    img:{
        flex:1, 
        resizeMode:'contain'
    },
    lbl:{
        position:'absolute', 
        top:12,
        left:23, 
        color: Colors.white, 
        fontSize: getFontSize(12), 
        fontWeight:'700'
    }
})

export default Cart;