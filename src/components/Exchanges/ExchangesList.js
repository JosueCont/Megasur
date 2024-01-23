import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import ExchangeItem from "./ExchangeItem";

const {height, width} = Dimensions.get('window');


const ExchangeList = ({data}) => {

    return(
        <View>
            <Text style={styles.title}>Especiales</Text>
            <View style={styles.container}>
                {data.map((item,index) => (
                    <ExchangeItem 
                        index={index}
                        item={item}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        alignSelf:'flex-start', 
        color: Colors.grayStrong, 
        fontSize:getFontSize(18), 
        fontWeight:'700',
        marginBottom:10
    },
    container:{
        flexDirection:'row', 
        flexWrap:'wrap', 
        justifyContent:'space-between'
    }
})

export default ExchangeList;