import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');


const TypeExchange = ({selected, setSelected}) => {
    const types = [
        {id:'1', title:'Combustible'},
        {id:'2', title:'Artículos'},
        {id:'3', title:'Artículos canjeados'},
    ]
    return(
        <View style={styles.container}>
            {types.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => setSelected(index)}
                    style={[styles.item, index != 2 && styles.limitHeight, {backgroundColor: selected === index ? Colors.yellowStrong : Colors.white,}]}>
                <Text style={[styles.lbl, { color: selected === index ? Colors.darkGray : Colors.grayStrong }]}>{item.title}</Text>
            </TouchableOpacity>
            ))}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width: width/1.2,
        backgroundColor: Colors.white,
        height:50,
        //paddingHorizontal:10,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:5,
        borderRadius:24,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    item:{
        flex:1, 
        padding:7, 
        borderRadius:24
    },
    lbl:{
        textAlign:'center', 
        fontSize: getFontSize(12), 
        fontWeight:'600', 
    },
    limitHeight:{
        height: 43,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default TypeExchange;