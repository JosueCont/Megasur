import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../utils/Colors";

const {height, width} = Dimensions.get('window');

const Input = ({value, setValue, background = Colors.white, ...props}) => {
    return(
        <TextInput onChangeText={setValue} value={value} style={[styles.input,{backgroundColor: background,}]} {...props}/>
    )
}

const styles = StyleSheet.create({
    input:{
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

export default Input;